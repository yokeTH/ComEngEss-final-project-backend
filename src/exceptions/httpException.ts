export enum HttpError {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export default class HttpException extends Error {
  public status: HttpError;
  public message: string;
  constructor(message?: string, status?: HttpError) {
    super(message);
    this.status = status || 500;
    this.message = message || 'Internal Server Error';
  }
}
