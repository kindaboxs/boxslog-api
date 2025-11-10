export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    path?: string;
    timestamp: string;
    stack?: string;
  };
};
