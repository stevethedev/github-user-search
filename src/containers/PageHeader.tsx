import React from 'react';
import type { OnSearchHandler } from '../components/SearchForm';
import { SearchForm } from '../components/SearchForm';
import { Page, usePage } from '../store/data/pages';
import { useSearchSubmit } from '../store/activities/search';
import { useSearchText } from '../store/data/search-text';
import styles from './PageHeader.module.css';

interface Props {
  hide: boolean;
}

export const PageHeader = ({ hide }: Props): JSX.Element => {
  const [searchText, setSearchText] = useSearchText();
  const [, setPage] = usePage();
  const searchSubmit = useSearchSubmit();

  const onSearch: OnSearchHandler = async (text) => {
    await searchSubmit(text);
    setPage(Page.Users);
  };

  const onReset = (): void => {
    setPage(Page.Search);
    setSearchText('');
  };

  return (
    <header className={`${styles['page-header']} ${hide ? styles['page-header--hidden'] : ''}`}>
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
