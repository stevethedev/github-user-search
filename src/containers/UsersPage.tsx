import React, { useState } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import { Pagination } from '../components/Pagination';
import { SearchResults } from '../components/SearchResults';
import { Page, usePage } from '../store/modules/pages';
import { useSearchSubmit } from '../store/modules/search';
import { useSearchCount } from '../store/modules/search-count';
import { useSearchText } from '../store/modules/search-text';
import { useSearchUsers } from '../store/modules/search-users';
import { useFetchUser, useUser } from '../store/modules/user';
import styles from './UsersPage.module.css';

export const UsersPage = (): JSX.Element => {
  const [tempSearchText] = useSearchText();
  const [searchText] = useState<string | null>(tempSearchText);
  const [searchCount] = useSearchCount();
  const searchSubmit = useSearchSubmit();
  const [users] = useSearchUsers();
  const [userPage, setUserPage] = useState(1);
  const pageLen = 10;
  const pageBuffer = 2;
  const pageEnd = Math.min(/* GitHub hard-coded max */100, Math.ceil(searchCount / pageLen)) + 1;
  const [, setPage] = usePage();
  const [, setUser] = useUser();
  const fetchUser = useFetchUser();

  const onPage = async (page: number) => {
    setUserPage(page);
    await searchSubmit(searchText, pageLen, pageLen * (page - 1));
  };

  const selectUser = async (user: ReadonlyDeep<User>) => {
    setPage(Page.User);
    setUser(user);
    await fetchUser(user.login);
  };

  return (
    <article className={styles['results-page']}>
      <div className={styles['results-page__user-count']}>
        {searchCount.toLocaleString()}
        {' '}
        users
      </div>
      <SearchResults users={users} onSelect={selectUser} />
      <Pagination
        start={1}
        end={pageEnd}
        current={userPage}
        buffer={pageBuffer}
        onSelected={onPage}
      />
    </article>
  );
};
