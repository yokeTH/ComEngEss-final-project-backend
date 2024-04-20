export default class HttpException extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
    this.message = message || 'Internal Server Error';
  }
}
