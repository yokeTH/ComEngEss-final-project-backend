import logger from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';

const logMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.headers['user-agent']} ${req.method} ${req.path}`);
  next();
};

export default logMiddleware;
