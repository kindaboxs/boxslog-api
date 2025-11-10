/**
 * Lib
 */
import { factory } from '@/lib';

/**
 * Middleware
 */
import { notFoundHandler, onErrorHandler } from '@/middleware';

export default function createApp() {
  const app = factory.createApp();

  app.notFound(notFoundHandler);
  app.onError(onErrorHandler);

  return app;
}
