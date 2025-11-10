/**
 * Node modules
 */
import pino from 'pino';
import pretty from 'pino-pretty';
import { format } from 'date-fns';

/**
 * Config
 */
import { env } from '@/config';

const logger = pino(
  {
    level: env.LOG_LEVEL,
    timestamp: () => `,"time":"${format(new Date(), 'HH:mm:ss')}"`,
  },
  pretty(),
);

export default logger;
