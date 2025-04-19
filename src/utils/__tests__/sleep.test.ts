import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest';

import { sleep } from '../sleep';

describe('sleep', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    test('should not resolve until timeout has elapsed', async () => {
        const spy = vi.fn();
        void sleep(100).then(spy);

        vi.advanceTimersByTime(20);
        await Promise.resolve();
        expect(spy).not.toHaveBeenCalled();

        vi.advanceTimersByTime(80);
        await Promise.resolve();
        expect(spy).toHaveBeenCalled();
    });
});
