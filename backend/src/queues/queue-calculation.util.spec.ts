import { estimateWaitMinutes, formatQueueNumber } from './queue-calculation.util';

describe('queue calculation utils', () => {
  it('formats queue numbers with A prefix and three digits', () => {
    expect(formatQueueNumber(1)).toBe('A001');
    expect(formatQueueNumber(16)).toBe('A016');
    expect(formatQueueNumber(120)).toBe('A120');
  });

  it('calculates estimated wait minutes from people ahead and average service time', () => {
    expect(estimateWaitMinutes(3, 10)).toBe(30);
    expect(estimateWaitMinutes(0, 12)).toBe(0);
  });
});