import { IQueue, IQueueService, QueueDefaultProps, QueueItem } from '../definitions';
import {QueueHasNoName} from '../errors/QueueHasNoName';
import { Local as LocalQueue } from '../services/queue/local';

export class Queue implements IQueue {
  private queue: IQueueService;

  constructor(private readonly queueProps: QueueDefaultProps) {
    if (!this.queueProps.name) {
      throw new QueueHasNoName('A LocalQueue has to have a name');
    }
    this.queue = new LocalQueue(this.queueProps);
  }

  public enqueue(item: QueueItem): void {
    this.queue.enqueue(item);
  }

  public dequeue(): QueueItem {
    return this.queue.dequeue();
  }
}
