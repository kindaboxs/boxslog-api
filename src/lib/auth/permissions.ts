import { createAccessControl } from 'better-auth/plugins/access';
import {
  adminAc,
  defaultStatements,
  userAc,
} from 'better-auth/plugins/admin/access';

import { UserRole } from '@/generated/prisma/enums';

const statement = {
  ...defaultStatements,
  blogs: ['create', 'read', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statement);

const admin = ac.newRole({
  ...adminAc.statements,
  blogs: ['create', 'read', 'update', 'delete'],
});

const user = ac.newRole({
  ...userAc.statements,
  blogs: ['read'],
});

export const roles = {
  [UserRole.ADMIN]: admin,
  [UserRole.USER]: user,
};
