import React, { useState } from 'react';
import { OnSearchHandler, SearchForm } from '../components/SearchForm';
import { SearchResults } from '../components/SearchResults';
import { useSearchSubmit } from '../store/search';
import { useSearchCount } from '../store/search-count';
import { useSearchText } from '../store/search-text';
import { useSearchUsers } from '../store/search-users';
import styles from './UsersPage.module.css';

export const UsersPage = (): JSX.Element => {
  const [tempSearchText] = useSearchText();
  const [searchText, setSearchText] = useState<string | null>(tempSearchText);
  const [searchCount] = useSearchCount();
  const searchSubmit = useSearchSubmit();
  const [users] = useSearchUsers();

  const onSearch: OnSearchHandler = async (text) => {
    await searchSubmit(text);
  };

  return (
    <article className={styles['results-page']}>
      <SearchForm onSubmit={onSearch} value={searchText} onChange={setSearchText} />
      <div>
        {searchCount.toLocaleString()}
        {' '}
        users
      </div>
      <SearchResults users={users} />
    </article>
  );
};
