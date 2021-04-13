import type { Octokit as TOctokit } from '@octokit/core';
import { Octokit } from '@octokit/core';
import type { GraphQlResponse, Query } from '@octokit/graphql/dist-types/types';

const tokenMap = new WeakMap<Token, Octokit>();

const tokenSymbol: unique symbol = Symbol('api-token-symbol');

export interface Token {
  [tokenSymbol]: true;
}

/**
 * Create a token that corresponds to the given graphql object.
 * @param gql
 */
export const mockToken = (
  gql: (query: Query, parameters?: RequestParameters) => GraphQlResponse<unknown>,
): Token => {
  const token = {
    [tokenSymbol]: true,
    useless: true,
  } as Token;
  const octokit = { graphql: gql ?? (() => Promise.reject()) } as Octokit;

  tokenMap.set(token, octokit);

  return token;
};

export const initialize = (auth: string): Token => {
  const octokit = new Octokit({ auth });
  const token: Token = { [tokenSymbol]: true };

  tokenMap.set(token, octokit);

  return token;
};

export const request = async (
  token: Token,
  query: string,
  params?: RequestParameters,
): Promise<unknown | null> => {
  const result = await tokenMap.get(token)
    ?.graphql(query, params);
  return result ?? null;
};

export type RequestParameters = Exclude<Parameters<TOctokit['graphql']>[1], undefined>;
