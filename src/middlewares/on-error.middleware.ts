import { env } from '@/configs/env';

import * as HttpStatusCodes from '@/constants/http-status-codes.constant';
import * as HttpStatusPhrases from '@/constants/http-status-pharses.constant';

import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import type { ApiErrorResponse } from '@/types/response.types';

const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status;
  const statusCode =
    currentStatus !== HttpStatusCodes.OK
      ? (currentStatus as ContentfulStatusCode)
      : HttpStatusCodes.INTERNAL_SERVER_ERROR;

  return c.json<ApiErrorResponse>(
    {
      success: false,
      error: {
        code: (HttpStatusPhrases as Record<string, string>)[statusCode],
        message: err.message,
        stack: env.NODE_ENV === 'production' ? undefined : err.stack,
      },
      path: c.req.path,
    },
    statusCode
  );
};

export default onError;
