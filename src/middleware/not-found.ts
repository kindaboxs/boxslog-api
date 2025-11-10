/**
 * Constants
 */
import { HttpStatusCodes, HttpStatusPhrases } from '@/constants';

/**
 * Types
 */
import type { NotFoundHandler } from 'hono';
import type { ApiErrorResponse } from '@/types';

const notFoundHandler: NotFoundHandler = (c) => {
  return c.json<ApiErrorResponse>(
    {
      success: false,
      error: {
        code: HttpStatusPhrases.NOT_FOUND,
        message: `The requested resource was ${HttpStatusPhrases.NOT_FOUND} to ${c.req.method} ${c.req.path}`,
        path: c.req.path,
        timestamp: new Date().toISOString(),
      },
    },
    HttpStatusCodes.NOT_FOUND,
  );
};

export default notFoundHandler;
