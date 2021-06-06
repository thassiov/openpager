export class QueueHasNoName extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, QueueHasNoName.prototype);
  }
}
