/**
 * Node modules
 */
import { factory } from '@/lib';

/**
 * Handlers
 */
import { createBlogHandler } from '@/handlers/blog';

const blogRoute = factory.createApp().basePath('/blogs');

// Create blog route (POST /blogs - Authenticated)
blogRoute.post('/', ...createBlogHandler);

export default blogRoute;
