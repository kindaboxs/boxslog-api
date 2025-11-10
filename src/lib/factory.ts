/**
 * Node modules
 */
import { createFactory } from 'hono/factory';

/**
 * Lib
 */
import { db } from '@/lib';

/**
 * Types
 */
import type { AppBindings } from '@/types/app-bindings';

const factory = createFactory<AppBindings>({
  defaultAppOptions: {
    strict: false,
  },

  initApp: (app) => {
    app.use(async (c, next) => {
      c.set('db', db);
      await next();
    });
  },
});

export default factory;
