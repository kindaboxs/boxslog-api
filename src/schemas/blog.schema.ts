/**
 * Node modules
 */
import * as z from 'zod';

const blogStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(180, 'Title must be at most 180 characters long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(360, 'Description must be at most 360 characters long'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(50000, 'Content must be at most 50000 characters long'),
  status: blogStatusSchema.default('DRAFT'),
});
