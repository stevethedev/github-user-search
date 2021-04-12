import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import { SearchResult } from './SearchResult';
import styles from './SearchResults.module.css';

interface Props {
  users: ReadonlyArray<ReadonlyDeep<User>>;
  onSelect: (user: ReadonlyDeep<User>) => void;
}

export const SearchResults = ({ users, onSelect }: Props): JSX.Element => (
  <div className={styles['search-results']}>
    {users.map((user) => <SearchResult key={user.id} user={user} onSelect={onSelect} />)}
  </div>
);
