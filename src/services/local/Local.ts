import { IQueueService, QueueDefaultProps } from "../../definitions";

export default class Local implements IQueueService {
  /* the queue's name */
  private name: string;

  constructor(private readonly queueProps: QueueDefaultProps) {
    this.name = this.queueProps.name;
  }

  public enqueue(): void {
    console.log('aaaa', this.getQueueName());
  }

  public dequeue(): void {
    console.log('aaaa', this.getQueueName());
  }

  private getQueueName(): string {
    return this.name;
  }
}
