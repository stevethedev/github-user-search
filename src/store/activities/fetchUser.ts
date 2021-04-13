import { useToken } from '../data/token';
import { useUsers } from '../data/users';
import { useUser } from '../data/user';
import type { Repositories } from '../data/repositories';
import { useRepositories } from '../data/repositories';
import type { Organizations } from '../data/organizations';
import { useOrganizations } from '../data/organizations';
import { read } from '../../api/user/read';

export type FetchUser = (text: string | null) => Promise<void>;

export const useFetchUser = (): FetchUser => {
  const [token] = useToken();
  const [, setUsers] = useUsers();
  const [, setUser] = useUser();
  const [, setRepositories] = useRepositories();
  const [, setOrganizations] = useOrganizations();

  return async (login: string | null) => {
    if (!login) {
      setUser(null);
      return;
    }

    const results = await read(token, { login });
    if (!results?.user) {
      setUser(null);
      return;
    }

    const { organizations, repositories, user } = results;

    setUsers({ [user.id]: user });

    setRepositories(repositories.reduce<Repositories>((acc, repo) => {
      acc[repo.id] = repo;
      return acc;
    }, {}));
    setOrganizations(organizations.reduce<Organizations>((acc, organization) => {
      acc[organization.id] = organization;
      return acc;
    }, {}));
  };
};
