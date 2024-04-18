import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import HttpException from '@/exceptions/httpException';
import { HttpClientError, HttpSuccess } from '@/enums/http';
import { SuccessResponseDto } from '@/dtos/response';
import { ZodError } from 'zod';
import { createUserCheck, loginUserCheck } from '@/utils/zodChecker';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, username, email } = req.body;
    createUserCheck(username, password, email);
    const existingUser = await prisma.user.findMany({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });
    if (existingUser.length !== 0) {
      throw new HttpException('Username or email already exists', HttpClientError.BadRequest);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
      },
    });
    res.json(new SuccessResponseDto(user, HttpSuccess.Created));
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      next(new HttpException(e.message, HttpClientError.BadRequest));
    } else {
      next(e);
    }
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, username } = req.body;
    loginUserCheck(username, password);
    const user = await prisma.user.findFirst({
      where: { username: username },
    });
    if (!user) {
      throw new HttpException('username not found', HttpClientError.BadRequest);
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign(JSON.stringify(user.id), process.env.TOKEN_SECRET as Secret);
      res.json(new SuccessResponseDto({ accessToken: accessToken }, HttpSuccess.Created));
    } else {
      throw new HttpException('wrong password', HttpClientError.BadRequest);
    }
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      next(new HttpException(e.message, HttpClientError.BadRequest));
    } else {
      next(e);
    }
  }
};
