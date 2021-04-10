import { request, Token, RequestParameters } from './request';

interface UserSearchParams extends RequestParameters {
  text: string;
  count?: number | null;
  after?: string | null;
}

interface UserSearchResult {
  cursor: string;
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
  query searchUsers($text: String!, $first: Int = 10${params.after ? ', $after: String!' : ''}) {
    search(query:$text, type:USER, first:$first${params.after ? ', after:$after' : ''}) {
      userCount
      edges {
        cursor
        node {
          ... on User {
            id
            login
            avatarUrl
          }
        }
      }
    }
  }`;

  const result = await request(token, query, params);

  const searchData = (result as SearchResults | null)?.search;
  if (!(searchData?.edges instanceof Array)) {
    return null;
  }

  const users = searchData.edges.map(({ node }) => node);
  const { cursor } = searchData.edges[searchData.edges.length - 1];
  const count = searchData.userCount;

  return { users, cursor, count };
};

interface SearchResults {
  search: {
    edges: Edge[];
    userCount: number;
  };
}

interface Edge {
  cursor: string;
  node: User;
}

export interface User {
  id: string;
  login: string;
  avatarUrl: string;
}
