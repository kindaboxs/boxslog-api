/**
 * Constants
 */
import { HttpStatusCodes, HttpStatusPhrases } from '@/constants';

/**
 * Lib
 */
import { auth } from '@/lib';
import factory from '@/lib/factory';

/**
 * Types
 */
import type { ApiErrorResponse } from '@/types';

const requireAuth = factory.createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json<ApiErrorResponse>(
      {
        success: false,
        error: {
          code: HttpStatusPhrases.UNAUTHORIZED,
          message: `You are not authorized to access this resource`,
          path: c.req.path,
          timestamp: new Date().toISOString(),
        },
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  c.set('session', session.session);
  c.set('user', session.user);
  await next();
});

export default requireAuth;
