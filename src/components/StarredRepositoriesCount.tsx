import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './StarredRepositoriesCount.module.css';

interface Params {
  repositories: ReadonlyDeep<User['starredRepositories']> | null;
}

export const StarredRepositoriesCount = ({ repositories }: Params): JSX.Element => (
  repositories ? (
    <span className={styles['starred-repositories-count']}>
      {repositories.totalCount.toLocaleString()}
      {' '}
      stars
    </span>
  ) : <></>
);
