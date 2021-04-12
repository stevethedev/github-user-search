import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import { UserAvatar } from './UserAvatar';
import { UserBio } from './UserBio';
import styles from './UserInfo.module.css';
import { UserLogin } from './UserLogin';
import { UserName } from './UserName';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserInfo = ({ user }: Props): JSX.Element => (
  <div className={styles['user-info']}>
    <span className={styles['user-info__avatar']}>
      <UserAvatar user={user} />
    </span>
    <span className={styles['user-info__name']}>
      <UserName user={user} />
    </span>
    <span className={styles['user-info__login']}>
      <UserLogin user={user} />
    </span>
    <span className={styles['user-info__bio']}>
      <UserBio user={user} />
    </span>
  </div>
);
