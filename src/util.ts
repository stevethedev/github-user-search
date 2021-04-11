export const isNumber = (n: unknown): n is number => (typeof n === 'number');

// eslint-disable-next-line @typescript-eslint/ban-types
export const isObject = (n: unknown): n is object => (typeof n === 'object' && n !== null && !Array.isArray(n));

export const isArray = (n: unknown): n is unknown[] => Array.isArray(n);
