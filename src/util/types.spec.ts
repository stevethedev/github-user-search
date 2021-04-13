import { isArray, isNumber, isObject } from './types';

describe('isNumber', () => {
  it('identifies number values', () => {
    expect(isNumber(1))
      .toBe(true);
  });

  it('fails on strings', () => {
    expect(isNumber('1'))
      .toBe(false);
  });

  it('fails on booleans', () => {
    expect(isNumber(true))
      .toBe(false);
  });

  it('fails on clever objects', () => {
    expect(isNumber({ toString: () => '1' }))
      .toBe(false);
  });

  it('fails on nullish values', () => {
    expect(isNumber(null))
      .toBe(false);
    expect(isNumber(undefined))
      .toBe(false);
  });

  it('fails on NaN', () => {
    expect(isNumber(NaN))
      .toBe(false);
  });

  it('fails on functions', () => {
    expect(isNumber(() => void 0))
      .toBe(false);
  });

  it('fails on clever arrays', () => {
    expect(isNumber([1]))
      .toBe(false);
  });
});

describe('isObject', () => {
  it('identifies objects', () => {
    expect(isObject({}))
      .toBe(true);
  });

  it('fails on numbers', () => {
    expect(isObject(1))
      .toBe(false);
  });

  it('fails on strings', () => {
    expect(isObject('1'))
      .toBe(false);
  });

  it('fails on booleans', () => {
    expect(isObject(true))
      .toBe(false);
  });

  it('fails on nullish values', () => {
    expect(isObject(null))
      .toBe(false);
    expect(isObject(undefined))
      .toBe(false);
  });

  it('fails on NaN', () => {
    expect(isObject(NaN))
      .toBe(false);
  });

  it('fails on functions', () => {
    expect(isObject(() => void 0))
      .toBe(false);
  });

  it('fails on arrays', () => {
    expect(isObject([]))
      .toBe(false);
  });
});

describe('isArray', () => {
  it('identifies arrays', () => {
    expect(isArray([]))
      .toBe(true);
  });

  it('identifies typed arrays', () => {
    expect(isArray(new Uint8Array(1)))
      .toBe(true);
  });

  it('fails on objects', () => {
    expect(isArray({}))
      .toBe(false);
  });

  it('fails on numbers', () => {
    expect(isArray(1))
      .toBe(false);
  });

  it('fails on strings', () => {
    expect(isArray('1'))
      .toBe(false);
  });

  it('fails on booleans', () => {
    expect(isArray(true))
      .toBe(false);
  });

  it('fails on nullish values', () => {
    expect(isArray(null))
      .toBe(false);
    expect(isArray(undefined))
      .toBe(false);
  });

  it('fails on NaN', () => {
    expect(isArray(NaN))
      .toBe(false);
  });

  it('fails on functions', () => {
    expect(isArray(() => void 0))
      .toBe(false);
  });
});
