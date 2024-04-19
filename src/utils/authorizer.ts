import HttpException from '@/exceptions/httpException';
import { jwtVerify } from '@/services/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authorize = async (token:string) => {
  let userId: string | undefined;
  console.log(process.env.TOKEN_SECRET!)
  const payload = await jwtVerify(token, process.env.TOKEN_SECRET!)
  //userId = userId!.replace(/"/g, ''); // replace " with ''
  console.log(payload)
  return payload;
};
