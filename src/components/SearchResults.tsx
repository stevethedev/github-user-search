import React from 'react';
import styles from './SearchResults.module.css';
import { SearchResult } from './SearchResult';

export const SearchResults = (): JSX.Element => (
  <div className={styles['search-results']}>
    <SearchResult />
  </div>
);
