import { useSelector } from 'react-redux';
import type { Token } from '../api/request';
import { initialize } from '../api/request';
import type { State } from './state';
import { addState } from './state';

declare const GITHUB_AUTH_TOKEN: string;

interface TokenState extends State {
  readonly token: Token;
}

addState<TokenState>((state) => ({
  ...state,
  token: initialize(GITHUB_AUTH_TOKEN),
}));

/**
 * Retrieve the token value from the store.
 */
export const useToken = (): [Token] => [useSelector((state: TokenState) => state.token)];
