/**
 * Node modules
 */
import { createFactory } from 'hono/factory';

/**
 * Lib
 */
import { auth, db } from '@/lib';

/**
 * Types
 */
import type { AppBindings } from '@/types';

const factory = createFactory<AppBindings>({
  defaultAppOptions: {
    strict: false,
  },

  initApp: (app) => {
    app.use(async (c, next) => {
      c.set('db', db);
      await next();
    });

    app.use(async (c, next) => {
      const session = await auth.api.getSession({ headers: c.req.raw.headers });

      if (!session) {
        c.set('user', null);
        c.set('session', null);
        await next();
        return;
      }

      c.set('session', session.session);
      c.set('user', session.user);
      await next();
    });
  },
});

export default factory;
