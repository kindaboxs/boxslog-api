import 'dotenv/config';

import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: z.coerce.number().int().min(1).max(65535),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
    CORS_ORIGINS: z
      .string()
      .default('')
      .transform(val => (val === '' ? [] : val.split(','))),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
