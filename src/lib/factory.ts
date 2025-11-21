import { createFactory } from 'hono/factory';

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
  },
});

export default factory;
