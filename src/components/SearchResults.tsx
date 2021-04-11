import React from 'react';
import { User } from '../api/user';
import { SearchResult } from './SearchResult';
import styles from './SearchResults.module.css';

interface Props {
  users: ReadonlyArray<User>;
}

export const SearchResults = ({ users }: Props): JSX.Element => (
  <div className={styles['search-results']}>
    {users.map((user) => <SearchResult key={user.id} user={user} />)}
  </div>
);
