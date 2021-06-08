import { config } from 'dotenv';
config();

import restApi from './restapi';

import { Queue as QueueService } from './services';
import Controllers from './controllers';
import { QueueDefaultProps } from './definitions';

(() => {
  const queueProps: QueueDefaultProps = {
    name: process.env.QUEUE_NAME || 'the-queue',
  };

  const queue_backend = process.env.QUEUE_BACKEND || 'local';
  const server_port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT as string) : 3000;

  const controllers = Controllers(new QueueService(queue_backend, queueProps));
  const api = restApi(controllers, server_port);
  api.startServer();
})();
