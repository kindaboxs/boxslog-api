/**
 * Constants
 */
import { HttpStatusCodes } from '@/constants';

/**
 * Config
 */
import { env } from '@/config';

/**
 * Types
 */
import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { ApiErrorResponse } from '@/types';

const onErrorHandler: ErrorHandler = (error, c) => {
  const currentStatus =
    'status' in error ? error.status : c.newResponse(null).status;

  const statusCode =
    currentStatus !== HttpStatusCodes.OK
      ? (currentStatus as ContentfulStatusCode)
      : HttpStatusCodes.INTERNAL_SERVER_ERROR;

  return c.json<ApiErrorResponse>(
    {
      success: false,
      error: {
        code: statusCode.toString(),
        message: error.message,
        path: c.req.path,
        timestamp: new Date().toISOString(),
        stack: env.NODE_ENV === 'production' ? undefined : error.stack,
      },
    },
    statusCode,
  );
};

export default onErrorHandler;
