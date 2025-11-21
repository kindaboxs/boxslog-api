import createApp from '@/lib/create-app';

const app = createApp();

app.get('/', c => {
  return c.redirect('/api');
});

export default app;
