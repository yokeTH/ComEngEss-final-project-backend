export class BaseResponseDto {
  constructor(data) {
    this.data = data;
  }
}

export class SuccessResponseDto extends BaseResponseDto {
  constructor(data, status) {
    super(data);
    this.status = {
      code: status ?? 200,
      message: 'success',
    };
  }
}

export class ErrorResponseDto extends BaseResponseDto {
  constructor(code, message) {
    super(undefined);
    this.status = {
      code: code ?? 500,
      message: message ?? 'Internal Server Error',
    };
  }
}
