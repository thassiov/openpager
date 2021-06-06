export interface IQueue {
  enqueue: () => void;
  dequeue: () => void;
}

export interface QueueDefaultProps {
  name: string;
}
