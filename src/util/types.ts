export const isNumber = (n: unknown): n is number => (typeof n === 'number') && !Number.isNaN(n);

// eslint-disable-next-line @typescript-eslint/ban-types
export const isObject = (n: unknown): n is object => (typeof n === 'object' && n !== null && !Array.isArray(n));

export const isArray = (n: unknown): n is unknown[] => (
  Array.isArray(n)
  || n instanceof Uint8Array
  || n instanceof Uint16Array
  || n instanceof Uint32Array
  || n instanceof Uint8ClampedArray
  || n instanceof Int8Array
  || n instanceof Int16Array
  || n instanceof Int32Array
  || n instanceof Float32Array
  || n instanceof Float64Array);
