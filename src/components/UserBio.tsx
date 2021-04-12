import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserBio.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserBio = ({ user }: Props): JSX.Element => (
  <span className={styles['user-bio']}>{user.bio}</span>
);
