import { handle } from '@hono/node-server/vercel';
import app from '../dist/app.mjs';

export default handle(app);
