import type { BlogStatus } from '@/generated/prisma/enums';

export interface Blog {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  content: string;
  status: BlogStatus;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    image: string | null;
    username: string | null;
  };
}

export const toBlogResponse = (blog: Blog) => {
  return {
    id: blog.id,
    title: blog.title,
    description: blog.description,
    slug: blog.slug,
    content: blog.content,
    status: blog.status,
    viewsCount: blog.viewsCount,
    likesCount: blog.likesCount,
    commentsCount: blog.commentsCount,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    author: {
      id: blog.author.id,
      name: blog.author.name,
      image: blog.author.image,
      username: blog.author.username,
    },
  };
};
