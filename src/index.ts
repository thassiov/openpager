import { config } from 'dotenv';
config();

import restApi from './restapi';

import { Queue as QueueService } from './services';
import Controllers from './controllers';
import { QueueDefaultProps, QueueRedisProps } from './definitions';

(() => {
  let queueProps: QueueDefaultProps = {
    name: process.env.QUEUE_NAME || 'the-queue',
  };

  const queue_backend = process.env.QUEUE_BACKEND || 'local';
  const server_port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT as string) : 3000;

  if (queue_backend == 'redis') {
    queueProps = {
      ...queueProps,
      host: process.env.REDIS_ADDRESS,
      port: process.env.REDIS_PORT,
    } as QueueRedisProps;
  }

  const controllers = Controllers(new QueueService(queue_backend, queueProps));
  const api = restApi(controllers, server_port);
  api.startServer();
})();
