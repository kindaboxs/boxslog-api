/**
 * Lib
 */
import { createApp } from '@/lib';

/**
 * Routes
 */
import { indexRoute, authRoute, blogRoute } from '@/routes';

// Create app
const app = createApp();

// Redirect root to /api
app.get('/', (c) => {
  return c.redirect('/api');
});

// Register routes
const routes = [indexRoute, authRoute, blogRoute];
routes.forEach((route) => {
  app.basePath('/api').route('/', route);
});

export default app;
