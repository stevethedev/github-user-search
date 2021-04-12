import type { RequestParameters, Token } from '../request';
import { request } from '../request';
import type { User } from './type';

interface UserReadParams extends RequestParameters {
  login: User['login'];
}

interface ReadResult {
  user: User | null;
  organizations: Organization[];
  repositories: Repository[];
}

interface UserResponse {
  id: string;
  avatarUrl: string;
  bio: string;
  login: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  starredRepositories: {
    totalCount: number;
  };
  location: string;
  company: string;
  url: string;
  twitterUsername: string;
  organizations: {
    totalCount: number;
    nodes: Organization[];
  }
  websiteUrl: string;
  status: { message: string; };
  pinnedItems: {
    totalCount: number;
    repositories: Repository[];
  }
  pinnableItems: {
    totalCount: number;
    repositories: Repository[]
  }
}

interface Organization {
  avatarUrl: string;
  name: string;
  websiteUrl: string;
  id: string;
  login: string;
}

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  languages: {
    nodes: {
      color: string;
      id: string;
      name: string;
    }
  }
  stargazerCount: number;
}

const READ_QUERY = `
  query searchUsers($login: String!) {
    user(login: $login) {
      avatarUrl
      login
      id
      bio
      followers {
        totalCount
      }
      following {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      location
      company
      url
      twitterUsername
      organizations(first: 10) {
        totalCount
        nodes {
          avatarUrl
          id
          login
          name
          websiteUrl
        }
      }
      websiteUrl
      status {
        message
      }
      pinnedItems(first: 10) {
        totalCount
        repositories: nodes {
          ... on Repository {
            id
            name
            description
            url
            languages(first: 1) {
              nodes {
                color
                id
                name
              }
            }
            stargazerCount
          }
        }
      }
      pinnableItems(first: 10) {
        totalCount
        repositories: nodes {
          ... on Repository {
            id
            name
            description
            url
            languages(first: 1) {
              nodes {
                color
                id
                name
              }
            }
            stargazerCount
          }
        }
      }
    }
  }`;

const parseRepositories = (repositories: UserResponse['pinnableItems']): User['pinnableItems'] => ({
  totalCount: repositories.totalCount,
  ids: repositories.repositories.map(({ id }) => id),
});

const parseOrganizations = (organizations: UserResponse['organizations']): User['organizations'] => ({
  totalCount: organizations.totalCount,
  ids: organizations.nodes.map(({ id }) => id),
});

const parseUser = (user: UserResponse): User => ({
  ...user,
  organizations: user?.organizations && parseOrganizations(user.organizations),
  pinnableItems: user?.pinnableItems && parseRepositories(user.pinnableItems),
  pinnedItems: user?.pinnedItems && parseRepositories(user.pinnedItems),
});

/**
 * Retrieves user information from the server.
 * @param token
 * @param params
 */
export const read = async (token: Token, params: UserReadParams):
  Promise<ReadResult | null> => {
  const queryParams = {
    login: params.login,
  };

  const result = await request(token, READ_QUERY, queryParams);

  const user = (result as { user: UserResponse } | null)?.user ?? null;

  return {
    user: user ? parseUser(user) : null,
    organizations: [],
    repositories: [],
  };
};
