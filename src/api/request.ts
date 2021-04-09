import { Octokit } from '@octokit/core';
import type { Octokit as TOctokit } from '@octokit/core';

const weakmap = new WeakMap<Token, Octokit>();

const tokenSymbol: unique symbol = Symbol('api-token-symbol');

export interface Token {
  [tokenSymbol]: true;
}

export const initialize = (auth: string): Token => {
  const octokit = new Octokit({ auth });
  const token: Token = { [tokenSymbol]: true };

  weakmap.set(token, octokit);

  return token;
};

export const request = async (
  token: Token,
  query: string,
  params?: RequestParameters,
): Promise<unknown | null> => {
  const result = await weakmap.get(token)?.graphql(query, params);
  return result ?? null;
};

export type RequestParameters = Exclude<Parameters<TOctokit['graphql']>[1], undefined>;
