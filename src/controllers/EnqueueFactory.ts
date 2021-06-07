import { IEnqueueController, IQueue, QueueItem } from "../definitions";

export function EnqueueFactory(queue: IQueue): IEnqueueController<QueueItem> {
  return async (item: QueueItem): Promise<void> => {
    await queue.enqueue(item);
  };
}
