import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserName.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserName = ({ user }: Props): JSX.Element => (
  <span className={styles['user-name']}>
    {user.name ?? user.login}
  </span>
);
