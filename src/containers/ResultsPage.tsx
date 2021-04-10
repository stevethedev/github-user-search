import React, { useState } from 'react';
import styles from './ResultsPage.module.css';
import { OnSearchHandler, SearchForm } from '../components/SearchForm';
import { SearchResults } from '../components/SearchResults';
import { useSearchSubmit } from '../store/search';
import { Page, usePage } from '../store/pages';
import { useSearchText } from '../store/search-text';
import { useSearchCount } from '../store/search-count';

export const ResultsPage = (): JSX.Element => {
  const [tempSearchText] = useSearchText();
  const [searchText, setSearchText] = useState<string | null>(tempSearchText);
  const [, setPage] = usePage();
  const [searchCount] = useSearchCount();
  const searchSubmit = useSearchSubmit();

  const onSearch: OnSearchHandler = async (text) => {
    setPage(Page.Results);
    await searchSubmit(text);
  };

  return (
    <article className={styles['results-page']}>
      <SearchForm onSubmit={onSearch} value={searchText} onChange={setSearchText} />
      <div>
        {searchCount.toLocaleString()}
        {' '}
        Users found
      </div>
      <SearchResults />
    </article>
  );
};
