import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  admin,
  anonymous,
  bearer,
  jwt,
  multiSession,
  openAPI,
  username,
} from 'better-auth/plugins';

import { env } from '@/configs/env';

import { db } from '@/lib/db';

import { UserRole } from '@/generated/prisma/enums';

import type { BetterAuthOptions } from 'better-auth';

export const authConfig = {
  appName: 'boxslog-api',
  advanced: {
    database: {
      generateId: false,
    },
  },
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  plugins: [
    admin({
      adminRoles: [UserRole.ADMIN],
      defaultRole: UserRole.USER,
    }),
    anonymous(),
    bearer(),
    jwt(),
    multiSession(),
    openAPI(),
    username(),
  ],
  secret: env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 24 * 3, // 3 days
  },
  trustedOrigins: env.CORS_ORIGINS,
} satisfies BetterAuthOptions;
