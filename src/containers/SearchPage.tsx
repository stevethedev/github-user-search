import React from 'react';
import type { OnSearchHandler } from '../components/SearchForm';
import { SearchForm } from '../components/SearchForm';
import { Page, usePage } from '../store/data/pages';
import { useSearchSubmit } from '../store/activities/search';
import { useSearchText } from '../store/data/search-text';
import styles from './SearchPage.module.css';

export const SearchPage = (): JSX.Element => {
  const [searchText, setSearchText] = useSearchText();
  const [, setPage] = usePage();
  const searchSubmit = useSearchSubmit();

  const onSearch: OnSearchHandler = async (text) => {
    await searchSubmit(text);
    setPage(Page.Users);
  };

  return (
    <article className={styles['search-page']}>
      <span className={styles['search-page__title']}>GitHub User Search</span>
      <SearchForm
        onSubmit={onSearch}
        value={searchText}
        onChange={setSearchText}
      />
    </article>
  );
};
