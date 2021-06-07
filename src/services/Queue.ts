import { IQueue, IQueueRepository, QueueDefaultProps, QueueItem, QueueRedisProps } from '../definitions';
import { QueueHasNoName } from '../errors/QueueHasNoName';
import { 
  Local as LocalQueueRepository,
  Redis as RedisQueueRepository,
} from '../repositories/queue';
import logger from '../utils/logger';

export class Queue implements IQueue {
  private queueRepository!: IQueueRepository;

  constructor(
    private readonly type: string,
    private readonly queueProps: QueueDefaultProps) {
      switch (this.type) {
        case 'local':
          this.queueRepository = this.setLocalRepository(this.queueProps)
          break;
        case 'redis':
          this.queueRepository = this.setRedisRepository(this.queueProps)
          break;
        default:
          logger.error('errr...');
          break;
      }
  }

  public async enqueue(item: QueueItem): Promise<void> {
    await this.queueRepository.enqueue(item);
  }

  public async dequeue(): Promise<QueueItem> {
    return this.queueRepository.dequeue();
  }

  private setLocalRepository(queueProps: QueueDefaultProps) {
    if (!queueProps.name) {
      throw new QueueHasNoName('A LocalQueue has to have a name');
    }
    return new LocalQueueRepository(queueProps);
  }

  private setRedisRepository(queueProps: QueueRedisProps) {
    if (!queueProps.name) {
      throw new QueueHasNoName('A RedisQueue has to have a name');
    }
    return new RedisQueueRepository(queueProps);
  }
}
