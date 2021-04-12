import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import { Button } from './Button';
import styles from './SearchResult.module.css';
import { UserAvatar } from './UserAvatar';
import { UserBio } from './UserBio';
import { UserEmail } from './UserEmail';
import { UserLocation } from './UserLocation';
import { UserLogin } from './UserLogin';
import { UserName } from './UserName';

interface Props {
  user: ReadonlyDeep<User>;
  onSelect: (user: ReadonlyDeep<User>) => void;
}

export const SearchResult = ({ user, onSelect }: Props): JSX.Element => {
  const onClick = () => onSelect(user);

  return (
    <div className={styles['search-result']}>
      <UserAvatar user={user} />
      <div className={styles['search-result__text']}>
        <span className={styles['search-result__user-name']}>
          <Button
            label={<UserName user={user} />}
            onClick={onClick}
            borderless
            link
            invert
            inline="text"
            color="blue"
          />
        </span>
        <span className={styles['search-result__user-login']}>
          <UserLogin user={user} />
        </span>
        <span className={styles['search-result__user-bio']}>
          <UserBio user={user} />
        </span>
        <span className={styles['search-result__user-location']}>
          <UserLocation user={user} />
        </span>
        <span className={styles['search-result__user-email']}>
          <UserEmail user={user} />
        </span>
      </div>
    </div>
  );
};
