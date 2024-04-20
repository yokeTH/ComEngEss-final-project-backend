import { ErrorResponseDto } from '../dtos/response.js';

export const errorMiddleware = (error, req, res, next) => {
  try {
    console.error(error);

    const status = error.status ?? 500;
    const message = error.message ?? 'Something went wrong';

    const response = new ErrorResponseDto(status, message);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};
