import { IQueue, IQueueService, QueueDefaultProps } from '../definitions';
import {QueueHasNoName} from '../errors/QueueHasNoName';
import { Local as LocalQueue } from '../services/local';

export class Queue implements IQueue {
  private queue: IQueueService;

  constructor(private readonly queueProps: QueueDefaultProps) {
    if (!this.queueProps.name) {
      throw new QueueHasNoName('A LocalQueue has to have a name');
    }
    this.queue = new LocalQueue(this.queueProps);
  }

  public enqueue(): void {
    console.log('enqueue');
    this.queue.enqueue();
  }

  public dequeue(): void {
    console.log('dequeue');
    this.queue.dequeue();
  }
}
