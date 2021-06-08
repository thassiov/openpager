import Fastify from 'fastify';

import { IControllers, QueueItem } from '../definitions';

import logger from '../utils/logger';

function restApi({ enqueue, dequeue }: IControllers<QueueItem>, server_port: number) {
  const fastify = Fastify({ logger: true });

  fastify.get('/', async (_, reply) => {
    reply.type('application/json').code(200)
    return { hello: 'world' }
  });

  fastify.post('/enqueue', async (request, reply) => {
    const dataToEnqueue = request.body;
    try {
      await enqueue(dataToEnqueue as QueueItem);
      reply.type('application/json').code(201)
      return { "status": "ok" };
    } catch (enequeueError) {
      return reply.type('application/json').code(500).send(enequeueError);
    }
  });

  fastify.post('/dequeue', async (_, reply) => {
    try {
      const dequeued = await dequeue();
      reply.type('application/json').code(200)
      return { "item": JSON.stringify(dequeued) };
    } catch (dequeueError) {
      return reply.type('application/json').code(500).send(dequeueError);
    }
  });

  return {
    startServer: () => {
      fastify.listen(server_port, '0.0.0.0', (err, address) => {
        if (err) throw err
          logger.info(`Server is now listening on ${address}`);
      });
    },
  };
}

export default restApi;
