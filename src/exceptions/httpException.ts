import { HttpClientError, HttpServerError } from '@/enums/http';
export default class HttpException extends Error {
  public status: HttpClientError | HttpServerError;
  public message: string;
  constructor(message?: string, status?: HttpClientError | HttpServerError) {
    super(message);
    this.status = status || 500;
    this.message = message || 'Internal Server Error';
  }
}
