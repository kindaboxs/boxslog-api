import { env } from '@/configs/env';

import * as HttpStatusCodes from '@/constants/http-status-codes.constant';

import factory from '@/lib/factory';

const indexRoute = factory.createApp();

indexRoute.get('/', c => {
  return c.json(
    {
      success: true,
      message: 'BoxsLog API',
      version: '1.0.0',
      author: '@mrboxs',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    },
    HttpStatusCodes.OK
  );
});

export default indexRoute;
