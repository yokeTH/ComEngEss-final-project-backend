export class BaseResponseDto<T> {
  data?: T;
  status?: {
    code?: number;
    message?: string | string[];
  };

  constructor(data?: T) {
    this.data = data;
  }
}

export class SuccessResponseDto<T> extends BaseResponseDto<T> {
  constructor(data?: T, status?: number) {
    super(data);
    this.status = {
      code: status ?? 200,
      message: 'success',
    };
  }
}

export class ErrorResponseDto<T> extends BaseResponseDto<T> {
  constructor(code?: number, message?: string) {
    super(undefined);
    this.status = {
      code: code ?? 500,
      message: message ?? 'Internal Server Error',
    };
  }
}
