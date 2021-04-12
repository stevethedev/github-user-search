import React, { useState } from 'react';
import type { OnSearchHandler } from '../components/SearchForm';
import { SearchForm } from '../components/SearchForm';
import { Page, usePage } from '../store/pages';
import { useSearchSubmit } from '../store/search';
import { useSearchText } from '../store/search-text';
import styles from './PageHeader.module.css';

export const PageHeader = (): JSX.Element => {
  const [tempSearchText, setGlobalSearchText] = useSearchText();
  const [searchText, setSearchText] = useState<string | null>(tempSearchText);
  const [, setPage] = usePage();
  const searchSubmit = useSearchSubmit();

  const onSearch: OnSearchHandler = async (text) => {
    setPage(Page.Users);
    await searchSubmit(text);
  };

  const onReset = (): void => {
    setPage(Page.Search);
    setSearchText('');
    setGlobalSearchText(null);
  };

  return (
    <header className={styles['page-header']}>
      <span
        aria-label="Home"
        className={styles['page-header__icon']}
        onClick={onReset}
        role="button"
        tabIndex={0}
        onKeyPress={(event) => event.key === 'Enter' && onReset()}
      />
      <SearchForm
        onSubmit={onSearch}
        value={searchText}
        onChange={setSearchText}
      />
    </header>
  );
};
