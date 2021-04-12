export const encode = (str: string): string => {
  const chars = str.split('').map((c) => c.charCodeAt(0));
  // eslint-disable-next-line no-bitwise
  const key = chars.reduce((a, b) => a ^ b) ^ (Math.random() * 256) | 0;
  // eslint-disable-next-line no-bitwise
  return btoa(`${String.fromCharCode(key)}${chars.map((c) => String.fromCharCode(c ^ key)).join('')}`);
};

export const decode = (str: string): string => {
  const [key, ...chars] = atob(str).split('').map((c) => c.charCodeAt(0));
  // eslint-disable-next-line no-bitwise
  return chars.map((c) => String.fromCharCode(c ^ key)).join('');
};
