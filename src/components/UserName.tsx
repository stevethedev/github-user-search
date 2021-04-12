import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserName.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserName = ({ user }: Props): JSX.Element => {
  const [, firstName, restName] = (user.name ?? user.login)?.match(/([^\s]+)(.*)/) ?? [user.name];

  return (
    <span className={styles['user-name']}>
      <span className={styles['user-name__first-name']}>{firstName}</span>
      {' '}
      <span className={styles['user-name__rest-name']}>{restName}</span>
    </span>
  );
};
