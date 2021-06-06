import { QueueHasNoName } from "../src/errors/QueueHasNoName";
import Queue from "../src/queue";

describe('Queue', () => {
  describe('new instance of local queue', () => {
    test('fail by not passing the queue name', () => {
      expect(() => new Queue({ name: '' })).toThrow(QueueHasNoName);
    });

    test('creates a queue instance by giving a name', () => {
      expect(() => new Queue({ name: 'the-queue' })).not.toThrow();
    });
  });
});
