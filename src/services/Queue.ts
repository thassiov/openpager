import { IQueue, IQueueRepository, QueueDefaultProps, QueueItem } from '../definitions';
import { QueueHasNoName } from '../errors/QueueHasNoName';
import { Local as LocalQueueRepository } from '../repositories/queue/local';

export class Queue implements IQueue {
  private queueRepository: IQueueRepository;

  constructor(private readonly queueProps: QueueDefaultProps) {
    if (!this.queueProps.name) {
      throw new QueueHasNoName('A LocalQueue has to have a name');
    }
    this.queueRepository = new LocalQueueRepository(this.queueProps);
  }

  public async enqueue(item: QueueItem): Promise<void> {
    await this.queueRepository.enqueue(item);
  }

  public async dequeue(): Promise<QueueItem> {
    return this.queueRepository.dequeue();
  }
}
