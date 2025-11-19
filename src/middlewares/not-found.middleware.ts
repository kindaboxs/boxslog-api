import * as HttpStatusCodes from '@/constants/http-status-codes.constant';
import * as HttpStatusPhrases from '@/constants/http-status-pharses.constant';

import type { NotFoundHandler } from 'hono';

import type { ApiErrorResponse } from '@/types/response.types';

const notFound: NotFoundHandler = c => {
  return c.json<ApiErrorResponse>(
    {
      success: false,
      error: {
        code: HttpStatusPhrases.NOT_FOUND,
        message: `${HttpStatusPhrases.NOT_FOUND} - ${c.req.path}`,
      },
      path: c.req.path,
    },
    HttpStatusCodes.NOT_FOUND
  );
};

export default notFound;
