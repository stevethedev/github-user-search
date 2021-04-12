import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import styles from './UserLocation.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserLocation = ({ user }: Props): JSX.Element => (
  <span className={styles['user-location']}>{user.location}</span>
);
