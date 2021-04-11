import React from 'react';
import { SearchPage } from './SearchPage';
import { UsersPage } from './UsersPage';
import { Page, usePage } from '../store/pages';

export const PageController = (): JSX.Element => {
  const [page] = usePage();

  if (page === Page.Users) {
    return <UsersPage />;
  }

  if (page === Page.Search) {
    return <SearchPage />;
  }

  return <></>;
};
