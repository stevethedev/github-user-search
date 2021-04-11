import React from 'react';
import { Page, usePage } from '../store/pages';
import { SearchPage } from './SearchPage';
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

  return <></>;
};

export const PageController = (): JSX.Element => (
  <>
    <PageHeader />
    <section className={styles['page-control']}>
      {getPage()}
    </section>
  </>
);
