import { isArray } from '../util';
import { CURSOR_ZERO, decode, encode } from './github-cursor';
import { request, RequestParameters, Token } from './request';

interface UserSearchParams extends RequestParameters {
  text: string;
  count?: number | null;
  offset?: number | null;
}

interface UserSearchResult {
  cursor: { start: number; end: number };
  users: User[];
  count: number;
}

/**
 * Retrieves user information from the server.
 * @param token
 * @param params
 */
export const search = async (token: Token, params: UserSearchParams):
  Promise<UserSearchResult | null> => {
  const query = `
  query searchUsers($text: String!, $first: Int = 10, $after: String = "${CURSOR_ZERO}") {
    search(query:$text, type:USER, first:$first, after:$after) {
      userCount
      pageInfo {
        startCursor
        endCursor
      }
      users: nodes {
        ... on User {
          avatarUrl
          bio
          company
          email
          id
          location
          login
          name
        }
      }
    }
  }`;

  const result = await request(token, query, {
    text: params.text,
    cursor: encode(params.offset),
  });

  const searchData = (result as SearchResults | null)?.search;
  if (!searchData || !isArray(searchData.users)) {
    return null;
  }

  const { userCount: count, users, pageInfo } = searchData;
  const cursor = {
    start: decode(pageInfo.startCursor) ?? 0,
    end: decode(pageInfo.endCursor) ?? 0,
  };

  return { users, cursor, count };
};

interface SearchResults {
  search: {
    userCount: number
    pageInfo: { startCursor: string; endCursor: string };
    users: User[];
  }
}

export interface User {
  avatarUrl: string;
  bio: string;
  company: string;
  email: string;
  id: string;
  location: string;
  login: string;
  name: string | null;
}
