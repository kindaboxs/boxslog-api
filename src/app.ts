/**
 * Lib
 */
import { createApp } from '@/lib';

/**
 * Routes
 */
import { indexRoute } from '@/routes';

// Create app
const app = createApp();

// Redirect root to /api
app.get('/', (c) => {
  return c.redirect('/api');
});

// Register routes
const routes = [indexRoute];
routes.forEach((route) => {
  app.basePath('/api').route('/', route);
});

export default app;
