/**
 * Node modules
 */
import { serve } from '@hono/node-server';

/**
 * App
 */
import app from '@/app';

/**
 * Config
 */
import { env } from '@/config';

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
