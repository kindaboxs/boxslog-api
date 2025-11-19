import { serve } from '@hono/node-server';

import { env } from '@/configs/env';

import { logger } from '@/lib/pino';

import app from '@/app';

const port = env.PORT;

const server = serve(
  {
    fetch: app.fetch,
    port,
  },
  info => {
    logger.info(`Server is running on http://localhost:${info.port}`);
  }
);

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.close(err => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
