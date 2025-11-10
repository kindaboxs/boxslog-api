/**
 * Constants
 */
import { HttpStatusCodes, HttpStatusPhrases } from '@/constants';

/**
 * Config
 */
import { env } from '@/config/env';

/**
 * Lib
 */
import factory from '@/lib/factory';

const indexRoute = factory.createApp().basePath('/');

indexRoute.get('/', (c) => {
  return c.json(
    {
      name: 'BoxsLog API',
      description: `BoxsLog API is a simple API for me to create/write blog posts.`,
      version: '1.0.0',
      status: HttpStatusPhrases.OK,
      message: 'API is Live',
      environment: env.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    HttpStatusCodes.OK,
  );
});

export default indexRoute;
