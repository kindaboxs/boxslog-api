/**
 * Node modules
 */
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  username,
  anonymous,
  admin,
  bearer,
  multiSession,
  jwt,
  openAPI,
} from 'better-auth/plugins';
import { betterAuth } from 'better-auth';

/**
 * Config
 */
import { env } from '@/config';

/**
 * Lib
 */
import { db } from '@/lib';

/**
 * Types
 */
import { type BetterAuthOptions } from 'better-auth';

export const auth = betterAuth<BetterAuthOptions>({
  appName: 'boxslog-api',
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: env.CORS_ORIGINS,
  secret: env.BETTER_AUTH_SECRET,
  advanced: {
    database: {
      generateId: false,
    },
  },
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  logger: {
    level: env.LOG_LEVEL,
    disabled: env.NODE_ENV === 'production',
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    openAPI(),
    jwt(),
    multiSession(),
    bearer(),
    admin(),
    anonymous(),
    username(),
  ],
});
