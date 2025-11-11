/**
 * Types
 */
import type { BlogStatus } from 'prisma/generated/prisma/enums';

export interface BlogResponse {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  status: BlogStatus;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string | null;
    username: string | null;
  };
}
