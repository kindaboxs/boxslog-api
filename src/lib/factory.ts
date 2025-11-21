import { createFactory } from 'hono/factory';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

import type { AppBindings } from '@/types/app-bindings.type';

const factory = createFactory<AppBindings>({
  defaultAppOptions: {
    strict: false,
  },

  initApp: app => {
    app.use('*', async (c, next) => {
      c.set('db', db);
      await next();
    });

    app.use('*', async (c, next) => {
      const session = await auth.api.getSession({ headers: c.req.raw.headers });

      if (!session) {
        c.set('session', null);
        c.set('user', null);
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
