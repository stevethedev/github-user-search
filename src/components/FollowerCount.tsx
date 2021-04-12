import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './FollowerCount.module.css';

interface Params {
  followers: ReadonlyDeep<User['followers']> | null;
}

export const FollowerCount = ({ followers }: Params): JSX.Element => (
  followers ? (
    <span className={styles['user-follower-count']}>
      {followers.totalCount}
      {' '}
      followers
    </span>
  ) : <></>
);
