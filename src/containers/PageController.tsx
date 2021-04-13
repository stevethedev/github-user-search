import React from 'react';
import { Page, usePage } from '../store/modules/pages';
import { PageFooter } from './PageFooter';
import { SearchPage } from './SearchPage';
import { UserPage } from './UserPage';
import { UsersPage } from './UsersPage';
import { PageHeader } from './PageHeader';
import styles from './PageController.module.css';

const getPage = (): JSX.Element => {
  const [page] = usePage();

  if (page === Page.Users) {
    return <UsersPage />;
  }

  if (page === Page.Search) {
    return <SearchPage />;
  }

  if (page === Page.User) {
    return <UserPage />;
  }

  return <></>;
};

const getHeaderHidden = (): boolean => {
  const [page] = usePage();
  return page === Page.Search;
};

export const PageController = (): JSX.Element => (
  <>
    <PageHeader hide={getHeaderHidden()} />
    <section className={styles['page-control']}>
      {getPage()}
    </section>
    <PageFooter />
  </>
);
