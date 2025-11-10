/**
 * Types
 */
import type { Env } from 'hono';
import type { PrismaClient } from '../../prisma/generated/prisma/client';

export interface AppBindings extends Env {
  Variables: {
    db: PrismaClient;
  };
}
