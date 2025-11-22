import { HTTPException } from 'hono/http-exception';

import * as HttpStatusCodes from '@/constants/http-status-codes.constant';

import { auth } from '@/lib/auth';
import factory from '@/lib/factory';

export const requireAuth = factory.createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    throw new HTTPException(HttpStatusCodes.UNAUTHORIZED, {
      message: 'Unauthorized. Please sign in.',
    });
  }

  c.set('session', session.session);
  c.set('user', session.user);
  await next();
});
