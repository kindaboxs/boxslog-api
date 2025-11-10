/**
 * Lib
 */
import createApp from '@/lib/create-app';

/**
 * Routes
 */
import indexRoute from '@/routes/index.route';

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
