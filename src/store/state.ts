import { Action } from 'redux';
import { initialize, Token } from '../api/request';

export interface State {
  readonly token: Token
}

export type Reducer = (state: State, action: Action) => State;

const reducers: Reducer[] = [];

declare const GITHUB_AUTH_TOKEN: string;
const initState = (): State => ({
  token: initialize(GITHUB_AUTH_TOKEN),
});

export const reducer = (state = initState(), action: Action): State => (
  reducers.reduce((acc, r) => r(acc, action), state)
);

export const addReducer = (r: Reducer): void => {
  reducers.push(r);
};
