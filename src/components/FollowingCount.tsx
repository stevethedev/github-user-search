import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './FollowingCount.module.css';

interface Params {
  following: ReadonlyDeep<User['following']> | null;
}

export const FollowingCount = ({ following }: Params): JSX.Element => (
  following ? (
    <span className={styles['user-following-count']}>
      {following.totalCount}
      {' '}
      following
    </span>
  ) : <></>
);
