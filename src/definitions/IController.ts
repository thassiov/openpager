export interface IEnqueueController<T> {
  (item: T): Promise<void>;
}

export interface IDequeueController<T> {
  (): Promise<T>;
}

export type IControllers<T> = {
  enqueue: IEnqueueController<T>;
  dequeue: IDequeueController<T>;
}
