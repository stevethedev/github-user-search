import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserMessage.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserMessage = ({ user }: Props): JSX.Element => (
  <span className={styles['user-message']}>{user.status?.message}</span>
);
