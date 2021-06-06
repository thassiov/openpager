import { QueueHasNoName } from "../src/errors/QueueHasNoName";
import { Queue } from "../src/core";

describe('Queue', () => {
  describe('new instance of local queue', () => {
    test('fail by not passing the queue name', () => {
      expect(() => new Queue({ name: '' })).toThrow(QueueHasNoName);
    });

    test('creates a queue instance by giving a name', () => {
      expect(() => new Queue({ name: 'the-queue' })).not.toThrow();
    });
  });

	describe('enqueue items', () => {
		it('adds three items in the queue', () => {
			const q = new Queue({ name: 'test-queue' });

			q.enqueue({ n: '1' });
			q.enqueue({ n: '2' });
			q.enqueue({ n: '3' });

			expect(q.dequeue()).toEqual({ n: '1' });
			expect(q.dequeue()).toEqual({ n: '2' });
			expect(q.dequeue()).toEqual({ n: '3' });
		});
	});
});
