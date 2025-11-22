import { zValidator } from '@hono/zod-validator';

import * as HttpStatusCodes from '@/constants/http-status-codes.constant';

import factory from '@/lib/factory';

import { requireAuth } from '@/middlewares/auth.middleware';

import { createBlogSchema } from '@/schemas/blog.schema';

import { createUniqueSlug } from '@/utils/slug.helper';

import type { ApiSuccessResponse } from '@/types/response.types';

export const createBlogHandler = factory.createHandlers(
  requireAuth,
  zValidator('form', createBlogSchema),
  async (c) => {
    const { title, content, description, status } = c.req.valid('form');
    const user = c.get('user')!;
    const db = c.get('db');

    const slug = await createUniqueSlug(title, async (slug) => {
      const existingSlug = await db.blog.findUnique({ where: { slug } });
      return !!existingSlug;
    });

    const blog = await db.blog.create({
      data: {
        title,
        content,
        description,
        status,
        slug,
        authorId: user.id,
      },
    });

    return c.json<ApiSuccessResponse<typeof blog>>(
      {
        success: true,
        message: 'Blog has been created!',
        data: blog,
      },
      HttpStatusCodes.CREATED
    );
  }
);
