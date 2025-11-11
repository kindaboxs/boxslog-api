/**
 * Node modules
 */
import { zValidator } from '@hono/zod-validator';

/**
 * Constants
 */
import { HttpStatusCodes } from '@/constants';

/**
 * Lib
 */
import { factory, logger } from '@/lib';

/**
 * Middleware
 */
import { requireAuth } from '@/middleware';

/**
 * Schemas
 */
import { createBlogSchema } from '@/schemas';

/**
 * Utils
 */
import { contentCleaner, slugGenerator } from '@/utils';
import type { ApiSuccessResponse, BlogResponse } from '@/types';

const createBlogHandler = factory.createHandlers(
  requireAuth,
  zValidator('form', createBlogSchema),
  async (c) => {
    const { title, content, description, status } = c.req.valid('form');
    const user = c.get('user')!;
    const db = c.get('db');

    const slug = slugGenerator(title);
    const cleanedContent = contentCleaner(content);

    const newBlog = await db.blog.create({
      data: {
        title,
        slug,
        content: cleanedContent,
        description,
        status,
        authorId: user.id,
      },
      include: {
        author: true,
      },
    });

    logger.info({ blog: newBlog }, 'New blog has been created!');

    const transformNewBlog: BlogResponse = {
      id: newBlog.id,
      title: newBlog.title,
      slug: newBlog.slug,
      content: newBlog.content,
      description: newBlog.description,
      status: newBlog.status,
      viewsCount: newBlog.viewsCount,
      likesCount: newBlog.likesCount,
      commentsCount: newBlog.commentsCount,
      createdAt: newBlog.createdAt,
      updatedAt: newBlog.updatedAt,
      author: {
        id: newBlog.author.id,
        name: newBlog.author.name,
        email: newBlog.author.email,
        image: newBlog.author.image,
        role: newBlog.author.role,
        username: newBlog.author.username,
      },
    };

    return c.json<ApiSuccessResponse<BlogResponse>>(
      {
        success: true,
        message: 'Blog created successfully',
        data: transformNewBlog,
      },
      HttpStatusCodes.CREATED,
    );
  },
);

export default createBlogHandler;
