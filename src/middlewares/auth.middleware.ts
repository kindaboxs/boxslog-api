import { HTTPException } from 'hono/http-exception';

import * as HttpStatusCodes from '@/constants/http-status-codes.constant';

import { auth } from '@/lib/auth';
import factory from '@/lib/factory';

import type { UserRole } from '@/generated/prisma/enums';

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

type AuthRole = UserRole;

export const requireRole = (allowedRoles: AuthRole[]) => {
  return factory.createMiddleware(async (c, next) => {
    const user = c.get('user');

    if (!user) {
      throw new HTTPException(HttpStatusCodes.UNAUTHORIZED, {
        message: 'Unauthorized. Please sign in.',
      });
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    const userRoles = user.role.split(',');
    const hasRole = roles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      throw new HTTPException(HttpStatusCodes.FORBIDDEN, {
        message:
          'Forbidden. You do not have permission to access this resource.',
      });
    }

    await next();
  });
};
