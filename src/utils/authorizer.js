import { HttpClientError } from '../enums/http.js';
import HttpException from '../exceptions/httpException.js';
import { User } from '../models/dbShema.js';
import { jwtVerify } from './jwt.js';

export const authorize = async (token) => {
  console.log(token);
  const payload = await jwtVerify(token, process.env.TOKEN_SECRET);
  if(!(await User.findById(payload.userId))) throw new HttpException("User's token doesn't exist anymore", HttpClientError.Unauthorized)
  console.log('token verified');
  console.log(payload);
  return payload;
};
