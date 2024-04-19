import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { bcryptHash,bcryptCompare } from '@/utils/bcrypt';
import { jwtSign,jwtVerify } from '@/services/jwt';
import HttpException from '@/exceptions/httpException';
import { HttpClientError, HttpSuccess } from '@/enums/http';
import { SuccessResponseDto } from '@/dtos/response';
import { date, ZodError } from 'zod';
import { createUserCheck, loginUserCheck } from '@/utils/zodChecker';

import { User } from '@/models/dbShema';


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, username, email } = req.body;
    createUserCheck(username, password, email);
    // const existingUser = await prisma.user.findMany({
    //   where: {
    //     OR: [{ username: username }, { email: email }],
    //   },
    // });
    // if (existingUser.length !== 0) {
    //   throw new HttpException('Username or email already exists', HttpClientError.BadRequest);
    // }
    const hashedPassword = await bcryptHash(password, 10);
    const user = await User.create({
        username: username,
        password: hashedPassword,
        email: email,
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

    // Find user by username
    const user = await User.findOne({ username }).exec();
    if (!user) {
      throw new HttpException('Username not found', HttpClientError.BadRequest);
    }

    // Compare passwords
    const match = await bcryptCompare(password, user.password);
    if (match) {
      // Generate access token
      const exptime:number = Math.floor(Date.now() / 1000) + (10*60 * 60)
      const accessToken = await jwtSign({ userId: user._id, exp:exptime }, process.env.TOKEN_SECRET!);
      res.json(new SuccessResponseDto({
        iat: Date.now(),
        exp: exptime,
        access_token: accessToken
      })); // Assuming you want to send only the access token
    } else {
      throw new HttpException('Wrong password', HttpClientError.BadRequest);
    }
  } catch (e: unknown) {
    next(e);
  }
};
