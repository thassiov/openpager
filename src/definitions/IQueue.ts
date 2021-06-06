export interface IQueue {
  enqueue: (item: QueueItem) => void;
  dequeue: () => QueueItem;
}

export interface QueueDefaultProps {
  name: string;
}

export interface QueueItem {
  [key: string]: string;
}
