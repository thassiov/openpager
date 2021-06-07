import restApi from './restapi';

import { Queue as QueueService } from './services';
import Controllers from './controllers';
import { QueueDefaultProps } from './definitions';

(() => {
  const queueProps: QueueDefaultProps = {
    name: 'the-queue',
  };

  const controllers = Controllers(new QueueService(queueProps));
  const api = restApi(controllers);
  api.startServer();
})();
