import Denque from 'denque';

import logger from "../../../utils/logger";
import { IQueueRepository, QueueDefaultProps, QueueItem } from "../../../definitions";

export default class Local implements IQueueRepository {
  /* the queue's name */
  private name: string;

  /* the queue's instance */
  private queue: Denque;

  constructor(private readonly queueProps: QueueDefaultProps) {
    this.name = this.queueProps.name;
    this.queue = new Denque();
  }

  public async enqueue(item: QueueItem): Promise<void> {
    logger.debug('enqueue', this.getQueueName());
    this.queue.unshift(item);
  }

  public dequeue(): Promise<QueueItem> {
    logger.debug('dequeue', this.getQueueName());
    return this.queue.pop();
  }

  private getQueueName(): string {
    return this.name;
  }
}
