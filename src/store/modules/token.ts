import { useSelector } from 'react-redux';
import type { Token } from '../../api/request';
import { initialize } from '../../api/request';
import type { State } from '../state';
import { addState } from '../state';
import { decode } from '../../util/key-codec';

declare const GITHUB_AUTH_TOKEN: string;

const TOKEN: unique symbol = Symbol('TOKEN');

interface TokenState extends State {
  readonly [TOKEN]: Token;
}

addState<TokenState>((state) => ({
  ...state,
  [TOKEN]: initialize(decode(GITHUB_AUTH_TOKEN)),
}));

/**
 * Retrieve the token value from the store.
 */
export const useToken = (): [Token] => [useSelector((state: TokenState) => state[TOKEN])];
