interface BaseResponse {
  success: boolean;
  message?: string;
  path?: string;
  timestampt?: string;
}

export interface ApiErrorResponse extends BaseResponse {
  success: false;
  error: {
    code?: string;
    message: string;
    details?: Record<string, unknown>;
    stack?: string;
  };
}
