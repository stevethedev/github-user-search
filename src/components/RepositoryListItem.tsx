import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { Repository } from '../api/repository/type';
import { Button } from './Button';
import { Language } from './Language';
import styles from './RepositoryListItem.module.css';

interface Props {
  repository: ReadonlyDeep<Repository>;
}

export const RepositoryListItem = ({ repository }: Props): JSX.Element => (
  <li className={styles['repository-list-item']}>
    <span className={styles['repository-list-item__name']}>
      <Button
        label={repository.resourcePath ?? repository.name ?? repository.url}
        onClick={() => window.open(repository.url)}
        borderless
        link
        invert
        inline="text"
        color="blue"
      />
    </span>
    <span className={styles['repository-list-item__description']}>{repository.description}</span>
    <span>
      <span className={styles['repository-list-item__languages']}>
        {repository.languages.slice(0, 1).map((language) => (
          <Language key={language.name} language={language} />))}
      </span>
      <span className={styles['repository-list-item__stargazers']}>
        {repository.stargazerCount.toLocaleString()}
        {' '}
        stargazers
      </span>
      <span className={styles['repository-list-item__forks']}>
        {repository.forkCount.toLocaleString()}
        {' '}
        forks
      </span>
    </span>
  </li>
);
