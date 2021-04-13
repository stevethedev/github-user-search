import type { Organization } from '../organization/type';
import type { Repository } from '../repository/type';
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
  login: string;
  avatarUrl?: string;
  bio?: string;
  followers?: { totalCount?: number };
  following?: { totalCount?: number };
  starredRepositories?: {
    totalCount?: number;
  };
  location?: string;
  company?: string;
  url?: string;
  twitterUsername?: string;
  organizations?: {
    totalCount?: number;
    nodes?: Organization[];
  };
  websiteUrl?: string;
  status?: { message?: string; };
  pinnedItems?: {
    totalCount?: number;
    repositories?: RawRepository[];
  };
  pinnableItems?: {
    totalCount?: number;
    repositories?: RawRepository[]
  };
}

interface RawRepository {
  id: string;
  name: string;
  description: string;
  url: string;
  forkCount: number;
  resourcePath?: string;
  languages?: {
    nodes?: {
      color: string;
      id: string;
      name: string;
    }[]
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
      pinnedItems(first: 10, types: REPOSITORY) {
        totalCount
        repositories: nodes {
          ... on Repository {
            id
            name
            description
            url
            languages(orderBy: {direction: DESC, field: SIZE}, first: 1) {
              nodes {
                color
                id
                name
              }
            }
            stargazerCount
            forkCount
            resourcePath
          }
        }
      }
      pinnableItems(first: 10, types: REPOSITORY) {
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
            forkCount
            resourcePath
          }
        }
      }
    }
  }`;

const parseRepositories = (repositories: UserResponse['pinnableItems']): User['pinnableItems'] => ({
  totalCount: repositories?.totalCount ?? 0,
  ids: repositories?.repositories?.map(({ id }) => id) ?? [],
});

const parseOrganizations = (organizations: UserResponse['organizations']): User['organizations'] => ({
  totalCount: organizations?.totalCount ?? 0,
  ids: organizations?.nodes?.map(({ id }) => id) ?? [],
});

const parseStatus = (status: UserResponse['status']): User['status'] => (
  status?.message ? { message: status.message } : void 0
);

const parseFollowing = (following: UserResponse['following']): User['following'] => (
  !(following?.totalCount) ? void 0 : { totalCount: following.totalCount }
);

const parseFollowers = (followers: UserResponse['followers']): User['followers'] => (
  !(followers?.totalCount) ? void 0 : { totalCount: followers.totalCount }
);

const parseStarredRepositories = (starred: UserResponse['starredRepositories']): User['starredRepositories'] => (
  !(starred?.totalCount) ? void 0 : { totalCount: starred.totalCount }
);

const parseUser = (user: UserResponse): User => {
  const output: User = {
    id: user.id,
    login: user.login,
    organizations: parseOrganizations(user.organizations),
    pinnableItems: parseRepositories(user.pinnableItems),
    pinnedItems: parseRepositories(user.pinnedItems),
  };

  const following = parseFollowing(user.following);
  if (following) {
    output.following = following;
  }

  const followers = parseFollowers(user.followers);
  if (followers) {
    output.followers = followers;
  }

  const status = parseStatus(user.status);
  if (status) {
    output.status = status;
  }

  const starredRepositories = parseStarredRepositories(user.starredRepositories);
  if (starredRepositories) {
    output.starredRepositories = starredRepositories;
  }

  return output;
};

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
    organizations: user?.organizations?.nodes ?? [],
    repositories: user
      ? [
        ...user.pinnedItems?.repositories ?? [],
        ...user.pinnableItems?.repositories ?? [],
      ].map<Repository>(({ languages, resourcePath, ...rest }) => ({
        ...rest,
        resourcePath: resourcePath?.substr(1) ?? rest.name,
        languages: languages?.nodes ?? [],
      }))
      : [],
  };
};
