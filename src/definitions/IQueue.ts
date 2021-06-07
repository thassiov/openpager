export interface IQueue {
  enqueue: (item: QueueItem) => Promise<void>;
  dequeue: () => Promise<QueueItem>;
}

export interface QueueDefaultProps {
  name: string;
}

export interface QueueItem {
  [key: string]: string;
}
