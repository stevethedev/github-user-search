import {
  bound, randomInteger, range, repeat,
} from './math';
import createSpy = jasmine.createSpy;

describe('repeat', () => {
  it('repeats a function `n` times for positive integer values of `n`', () => {
    const COUNT = (Math.random() * 100) | 0;
    const fn = createSpy();
    const result = repeat(COUNT, fn);
    expect(fn).toHaveBeenCalledTimes(COUNT);
    expect(result).toHaveLength(COUNT);
  });

  it('does not repeat for negative integer values of `n`', () => {
    const COUNT = (Math.random() * 100) | 0;
    const fn = createSpy();
    const result = repeat(-COUNT, fn);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(result).toHaveLength(0);
  });
});

describe('bound', () => {
  it('binds a lower-bound', () => {
    expect(bound(1, 2, 3)).toBe(2);
  });

  it('binds an upper-bound', () => {
    expect(bound(3, 1, 2)).toBe(2);
  });

  it('returns a middle-value', () => {
    expect(bound(2, 1, 3)).toBe(2);
  });
});

describe('range', () => {
  it('iterates backwards for decreasing ranges', () => {
    expect(range(5, 1)).toEqual([5, 4, 3, 2]);
  });
  it('iterates forewards for increasing ranges', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
  });
});

describe('randomInteger', () => {
  it('generates a random integer between the two values', () => {
    for (let i = 0; i < 1000; ++i) {
      const rand = randomInteger(1, 5);
      expect(rand)
        .toBeLessThanOrEqual(5);
      expect(rand)
        .toBeGreaterThanOrEqual(1);
    }
  });

  it('is indifferent to parameter ordering', () => {
    for (let i = 0; i < 1000; ++i) {
      const rand = randomInteger(5, 1);
      expect(rand)
        .toBeLessThanOrEqual(5);
      expect(rand)
        .toBeGreaterThanOrEqual(1);
    }
  });
});
