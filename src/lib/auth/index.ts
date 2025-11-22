import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  admin as adminPlugin,
  anonymous,
  bearer,
  jwt,
  multiSession,
  openAPI,
  username,
} from 'better-auth/plugins';

import { env } from '@/configs/env';

import { ac, roles } from '@/lib/auth/permissions';
import { db } from '@/lib/db';

import { UserRole } from '@/generated/prisma/enums';

export const auth = betterAuth({
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
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const isAdminEmail = env.ADMIN_EMAILS.includes(user.email);

          if (isAdminEmail) {
            return {
              data: {
                ...user,
                role: UserRole.ADMIN,
              },
            };
          }

          return {
            data: user,
          };
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  plugins: [
    adminPlugin({
      adminRoles: [UserRole.ADMIN],
      defaultRole: UserRole.USER,
      ac,
      roles,
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
  user: {
    additionalFields: {
      role: {
        type: [UserRole.USER, UserRole.ADMIN],
        defaultValue: UserRole.USER,
      },
    },
  },
});
