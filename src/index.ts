import { serve } from '@hono/node-server';

import { env } from '@/configs/env';

import app from '@/app';

const port = env.PORT;

async function main() {
  try {
    serve(
      {
        fetch: app.fetch,
        port,
      },
      info => {
        console.log(`Server is running on http://localhost:${info.port}`);
      }
    );
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

void main();
