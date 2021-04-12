import { search } from '../api/user/search';
import { useSearchCount } from './search-count';
import { useSearchText } from './search-text';
import { useSearchUsers } from './search-users';
import { useToken } from './token';
import type { Users } from './users';
import { useUsers } from './users';

export type SearchSubmit = (text: string | null, count?: number, offset?: number) => Promise<void>;

export const useSearchSubmit = (): SearchSubmit => {
  const [token] = useToken();
  const [searchText, setSearchText] = useSearchText();
  const [, setSearchCount] = useSearchCount();
  const [, setUsers] = useUsers();
  const [, setSearchUsers] = useSearchUsers();

  return async (text, count?: number, offset?: number) => {
    setSearchText(text);

    if (!text) {
      return;
    }

    const isContinuedQuery = text === searchText;

    if (!isContinuedQuery) {
      setSearchCount(0);
    }

    const results = await search(token, { text, count, offset });
    if (!results) {
      return;
    }

    setSearchCount(results.count);
    setSearchUsers(results.users);
    setUsers(results.users.reduce<Users>((acc, user) => {
      acc[user.id] = user;
      return acc;
    },
    Object.create(null)));
  };
};
