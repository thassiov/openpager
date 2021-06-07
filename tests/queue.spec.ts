import { QueueHasNoName } from "../src/errors/QueueHasNoName";
import { Queue } from "../src/services";

describe('Queue', () => {
  describe('new instance of local queue', () => {
    test('fail by not passing the queue name', async () => {
      expect(() => new Queue({ name: '' })).toThrow(QueueHasNoName);
    });

    test('creates a queue instance by giving a name', async () => {
      expect(() => new Queue({ name: 'the-queue' })).not.toThrow();
    });
  });

  describe('enqueue items', () => {
    it('adds three items in the queue', async () => {
      const q = new Queue({ name: 'test-queue' });

      try {
        await q.enqueue({ n: '1' });
        await q.enqueue({ n: '2' });
        await q.enqueue({ n: '3' });
      } catch (error) {
        expect(error).toBe(undefined);
      }

      expect(q.dequeue()).resolves.toEqual({ n: '1' });
      expect(q.dequeue()).resolves.toEqual({ n: '2' });
      expect(q.dequeue()).resolves.toEqual({ n: '3' });
    });
  });
});
