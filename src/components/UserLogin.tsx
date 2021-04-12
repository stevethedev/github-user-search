import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserLogin.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserLogin = ({ user }: Props): JSX.Element => (
  <span className={styles['user-login']}>{user.login}</span>
);
