/**
 * Types
 */
import type { Env } from 'hono';
import type { PrismaClient } from '../../prisma/generated/prisma/client';
import type { auth } from '@/lib';

export interface AppBindings extends Env {
  Variables: {
    db: PrismaClient;
    session: typeof auth.$Infer.Session.session | null;
    user: typeof auth.$Infer.Session.user | null;
  };
}
