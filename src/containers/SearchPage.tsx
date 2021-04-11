import React, { useState } from 'react';
import { OnSearchHandler, SearchForm } from '../components/SearchForm';
import { Page, usePage } from '../store/pages';
import { useSearchSubmit } from '../store/search';
import { useSearchText } from '../store/search-text';
import styles from './SearchPage.module.css';

export const SearchPage = (): JSX.Element => {
  const [tempSearchText] = useSearchText();
  const [searchText, setSearchText] = useState<string | null>(tempSearchText);
  const [, setPage] = usePage();
  const searchSubmit = useSearchSubmit();

  const onSearch: OnSearchHandler = async (text) => {
    setPage(Page.Users);
    await searchSubmit(text);
  };

  return (
    <article className={styles['search-page']}>
      <SearchForm onSubmit={onSearch} value={searchText} onChange={setSearchText} />
    </article>
  );
};
