import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserCompany.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserCompany = ({ user }: Props): JSX.Element => (
  <span className={styles['user-company']}>{user.company}</span>
);
