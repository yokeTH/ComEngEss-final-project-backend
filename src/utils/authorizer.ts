import { jwtVerify } from '@/services/jwt';

export const authorize = async (token: string) => {
  console.log(token);
  const payload = await jwtVerify(token, process.env.TOKEN_SECRET!);
  console.log('token verified');
  console.log(payload);
  return payload;
};
