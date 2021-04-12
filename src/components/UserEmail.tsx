import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserEmail.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserEmail = ({ user }: Props): JSX.Element => (
  <span className={styles['user-email']}>{user.email}</span>
);
