import Denque from 'denque';

import logger from "../../../utils/logger";
import { IQueueService, QueueDefaultProps, QueueItem } from "../../../definitions";

export default class Local implements IQueueService {
  /* the queue's name */
  private name: string;

  /* the queue's instance */
  private queue: Denque;

  constructor(private readonly queueProps: QueueDefaultProps) {
    this.name = this.queueProps.name;
    this.queue = new Denque();
  }

  public enqueue(item: QueueItem): void {
    logger.debug('enqueue', this.getQueueName());
    this.queue.unshift(item);
  }

  public dequeue(): QueueItem {
    logger.debug('dequeue', this.getQueueName());
    return this.queue.pop();
  }

  private getQueueName(): string {
    return this.name;
  }
}
