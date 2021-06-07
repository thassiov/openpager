import { IDequeueController, IQueue, QueueItem } from "../definitions";

export function DequeueFactory(queue: IQueue): IDequeueController<QueueItem> {
  return (): Promise<QueueItem> => {
    return queue.dequeue();
  }
}
