import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserTwitter.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserTwitter = ({ user }: Props): JSX.Element => (
  <span className={styles['user-twitter']}>{user.twitterUsername}</span>
);
