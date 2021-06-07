import { ClientOpts as RedisClientOpts } from "redis";

export interface IQueue {
  enqueue: (item: QueueItem) => Promise<void>;
  dequeue: () => Promise<QueueItem>;
}

export interface QueueDefaultProps {
  name: string;
}

export interface QueueRedisProps extends RedisClientOpts, QueueDefaultProps {}

export interface QueueItem {
  [key: string]: string;
}
