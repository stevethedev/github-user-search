import React from 'react';
import styles from './SearchResult.module.css';
import { User } from '../api/user';

interface Props {
  user: User;
}

export const SearchResult = ({ user }: Props): JSX.Element => {
  const {
    avatarUrl, login, location, email, bio, name,
  } = user;
  const [firstName, restName] = name?.match(/([^\s]+)(.*)/) ?? [name];

  return (
    <div className={styles['search-result']}>
      <img
        className={styles['search-result__user-avatar']}
        src={avatarUrl}
        alt={`${login} avatar`}
      />
      <div className={styles['search-result__text']}>
        <span className={styles['search-result__user-name']}>
          <span>{firstName}</span>
          {restName}
        </span>
        <span className={styles['search-result__user-login']}>{login}</span>
        <span className={styles['search-result__user-bio']}>{bio}</span>
        <span className={styles['search-result__user-location']}>{location}</span>
        <span className={styles['search-result__user-email']}>{email}</span>
      </div>
    </div>
  );
};
