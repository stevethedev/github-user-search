import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import { FollowerCount } from './FollowerCount';
import { FollowingCount } from './FollowingCount';
import { StarredRepositoriesCount } from './StarredRepositoriesCount';
import styles from './UserInteractions.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserInteractions = ({ user }: Props): JSX.Element => (
  <div className={styles['user-interactions']}>
    <span className={styles['user-interactions__interaction']}>
      <FollowerCount followers={user.followers ?? null} />
    </span>
    <span className={styles['user-interactions__interaction']}>
      <FollowingCount following={user.following ?? null} />
    </span>
    <span className={styles['user-interactions__interaction']}>
      <StarredRepositoriesCount repositories={user.starredRepositories ?? null} />
    </span>
  </div>
);
