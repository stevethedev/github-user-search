import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserOrganization.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserOrganization = ({ user }: Props): JSX.Element => (
  <div className={styles['user-organization']}>
    <span className={styles['user-organization__header']}>
      {user.organizations?.totalCount}
      {' '}
      {user.organizations?.totalCount === 1 ? 'Organization' : 'Organizations'}
    </span>
    {/* <span>{user.organizations?.ids}</span> */}
  </div>
);
