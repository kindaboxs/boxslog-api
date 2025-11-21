import type { PrismaClient } from '@/generated/prisma/client';
import type { auth } from '@/lib/auth';
import type { Env } from 'hono';

export interface AppBindings extends Env {
  Variables: {
    db: PrismaClient;
    session: typeof auth.$Infer.Session.session | null;
    user: typeof auth.$Infer.Session.user | null;
  };
}
