import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements } from 'better-auth/plugins/admin/access';

const statement = {
  ...defaultStatements,
} as const;

export const ac = createAccessControl(statement);
