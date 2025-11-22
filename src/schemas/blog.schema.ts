import * as z from 'zod';

import { BlogStatus } from '@/generated/prisma/enums';

const blogStatusSchema = z.enum(BlogStatus);

export const createBlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: 'Title is required' })
    .max(180, { error: 'Max title length is 180 characters' }),
  description: z
    .string()
    .trim()
    .max(360, { error: 'Max description length is 360 characters' })
    .optional(),
  content: z
    .string()
    .trim()
    .min(1, { error: 'Content is required' })
    .max(100000, { error: 'Max content length is 100000 characters' }),
  status: blogStatusSchema.default(BlogStatus.DRAFT),
});
