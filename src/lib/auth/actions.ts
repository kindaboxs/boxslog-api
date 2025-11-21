import { env } from '@/configs/env';

import { UserRole } from '@/generated/prisma/enums';

import type { BetterAuthOptions } from 'better-auth';

export const authActions = {
  databaseHooks: {
    user: {
      create: {
        before: async user => {
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
} satisfies BetterAuthOptions;
