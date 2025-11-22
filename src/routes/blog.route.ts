import { createBlogHandler } from '@/handlers/blog/create-blog.handler';

import factory from '@/lib/factory';

const blogRoute = factory.createApp();

blogRoute.post('/', ...createBlogHandler);

export default blogRoute;
