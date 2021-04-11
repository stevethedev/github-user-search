import React, { useState } from 'react';
import { Pagination } from '../components/Pagination';
import { SearchResults } from '../components/SearchResults';
import { useSearchSubmit } from '../store/search';
import { useSearchCount } from '../store/search-count';
import { useSearchText } from '../store/search-text';
import { useSearchUsers } from '../store/search-users';
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

  const onPage = async (page: number) => {
    setUserPage(page);
    await searchSubmit(searchText, pageLen, pageLen * (page - 1));
  };

  return (
    <article className={styles['results-page']}>
      <div>
        {searchCount.toLocaleString()}
        {' '}
        users
      </div>
      <SearchResults users={users} />
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
