import { search } from '../../api/user/search';
import { useSearchCount } from '../data/search-count';
import { useSearchText } from '../data/search-text';
import { useSearchUsers } from '../data/search-users';
import { useToken } from '../data/token';
import type { Users } from '../data/users';
import { useUsers } from '../data/users';

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

    // Optimization: pre-load user data
    // results.users.forEach((user) => {
    //   void fetchUser(user.login);
    // });
  };
};
