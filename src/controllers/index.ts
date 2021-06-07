import { EnqueueFactory } from './EnqueueFactory';
import { DequeueFactory } from './DequeueFactory';

import { IControllers, IQueue, QueueItem } from '../definitions';

export default function Controllers(queue: IQueue): IControllers<QueueItem> {
  const enqueue = EnqueueFactory(queue);
  const dequeue = DequeueFactory(queue);

  return {
    enqueue,
    dequeue
  };
}
