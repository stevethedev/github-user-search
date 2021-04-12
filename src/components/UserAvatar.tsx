import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserAvatar.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserAvatar = ({ user }: Props): JSX.Element => (
  <img
    className={styles['user-avatar']}
    src={user.avatarUrl}
    alt={`${user.login} avatar`}
  />
);
