import HttpException from '@/exceptions/httpException';
import jwt, { Secret } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authorize = async (token: string) => {
  let userId: string | undefined;
  await jwt.verify(token, process.env.TOKEN_SECRET as Secret, async (err: unknown, decoded) => {
    if (err instanceof Error) {
      throw new HttpException(err.message, 403);
    }
    userId = decoded as string;
  });
  userId = userId!.replace(/"/g, ''); // replace " with ''

  return userId;
};
