import { jwtVerify } from './jwt.js';

export const authorize = async (token) => {
  console.log(token);
  const payload = await jwtVerify(token, process.env.TOKEN_SECRET);
  console.log('token verified');
  console.log(payload);
  return payload;
};
