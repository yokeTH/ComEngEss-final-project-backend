import HttpException from '@/exceptions/httpException';
import { jwtVerify } from '@/services/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authorize = async (token:string) => {
  let userId: string | undefined;
  console.log(token)
  const payload = await jwtVerify(token, process.env.TOKEN_SECRET!)
  
  console.log("token verified")
  console.log(payload)
  return payload;
};
