import { randomInteger, repeat } from './math';
import { decode, encode } from './key-codec';

const STR = repeat(
  randomInteger(500, 1000),
  () => String.fromCharCode(randomInteger(1, 255)),
).join('');

it('encodes values', () => {
  expect(encode(STR)).not.toBe(STR);
});

it('decodes values', () => {
  expect(decode(encode(STR))).toBe(STR);
});

it('cannot decode with the encode function', () => {
  expect(encode(encode(STR))).not.toBe(STR);
});

it('cannot encode with the decode function', () => {
  expect(decode(decode(STR))).not.toBe(STR);
});
