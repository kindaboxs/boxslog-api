import { zValidator } from '@hono/zod-validator';

import * as HttpStatusCodes from '@/constants/http-status-codes.constant';

import factory from '@/lib/factory';

import { requireAuth, requireRole } from '@/middlewares/auth.middleware';

import { createBlogSchema } from '@/schemas/blog.schema';

import { createUniqueSlug } from '@/utils/slug.helper';

import { toBlogResponse } from '@/types/blog.type';

import type { Blog } from '@/types/blog.type';
import type { ApiSuccessResponse } from '@/types/response.types';

export const createBlogHandler = factory.createHandlers(
  requireAuth,
  requireRole(['ADMIN']),
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
      include: {
        author: true,
      },
    });

    return c.json<ApiSuccessResponse<Blog>>(
      {
        success: true,
        message: 'Blog has been created!',
        data: toBlogResponse(blog),
      },
      HttpStatusCodes.CREATED
    );
  }
);
