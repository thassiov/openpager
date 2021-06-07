import logger from "../../../utils/logger";
import { IQueueRepository, QueueRedisProps, QueueItem } from "../../../definitions";
import redis, { RedisClient } from "redis";

export default class Redis implements IQueueRepository {
  private name: string;

  private queue: RedisClient;

  constructor(private readonly queueProps: QueueRedisProps) {
    try {
      this.name = this.queueProps.name;
      this.queue = redis.createClient(this.queueProps);
      this.listenToRedisEvents();

    } catch (errorRedis) {
      logger.error('Something related to redis');
      logger.error(errorRedis);
      throw errorRedis;
    }
  }

  public async enqueue(item: QueueItem): Promise<void> {
    logger.debug('enqueue', this.getQueueName());
    return new Promise((resolve, reject) => {
      this.queue.lpush(this.getQueueName(), JSON.stringify(item), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  public async dequeue(): Promise<QueueItem> {
    logger.debug('dequeue', this.getQueueName());

    return new Promise((resolve, reject) => {
      this.queue.rpop(this.getQueueName(), (err, item) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(item));
      });
    });
  }

  private getQueueName() {
    return this.name;
  }

  /* private isConnected() {
   *   return this.queue.connected;
   * } */

  private listenToRedisEvents() {
    this.queue.on('ready', () => logger.info('Redis client is connected to the server'));
    this.queue.on('reconnecting', () => logger.info('Redis client is trying to reconnect to the server'));
    this.queue.on('error', (error) => logger.error(error.message));
    this.queue.on('end', () => logger.info('Redis client has disconnected from the server'));
  }
}
