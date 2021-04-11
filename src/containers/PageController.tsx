import React from 'react';
import { Page, usePage } from '../store/pages';
import { SearchPage } from './SearchPage';
import { UsersPage } from './UsersPage';

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
