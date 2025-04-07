import { sleep } from '../sleep';

describe('sleep', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });

    test('should not resolve until timeout has elapsed', async () => {
        const spy = jest.fn();
        void sleep(100).then(spy);

        jest.advanceTimersByTime(20);
        await Promise.resolve();
        expect(spy).not.toHaveBeenCalled();

        jest.advanceTimersByTime(80);
        await Promise.resolve();
        expect(spy).toHaveBeenCalled();
    });
});
