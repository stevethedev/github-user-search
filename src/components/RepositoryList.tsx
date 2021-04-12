import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { Repository } from '../api/repository/type';
import { RepositoryListItem } from './RepositoryListItem';
import styles from './RepositoryList.module.css';

interface Props {
  repositories: ReadonlyDeep<Repository>[];
}

export const RepositoryList = ({ repositories }: Props): JSX.Element => (
  <ol className={styles['repository-list']}>
    {repositories.map((repository) => (
      <RepositoryListItem key={repository.id} repository={repository} />
    ))}
  </ol>
);
