import React from 'react';
import { SearchPage } from './SearchPage';
import { ResultsPage } from './ResultsPage';
import { Page, usePage } from '../store/pages';

export const PageController = (): JSX.Element => {
  const [page] = usePage();

  if (page === Page.Results) {
    return <ResultsPage />;
  }

  if (page === Page.Search) {
    return <SearchPage />;
  }

  return <></>;
};
