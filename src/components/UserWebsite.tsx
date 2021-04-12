import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserWebsite.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserWebsite = ({ user }: Props): JSX.Element => (
  <span className={styles['user-website']}>{user.websiteUrl}</span>
);
