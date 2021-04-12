import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../api/user/type';
import { UserCompany } from './UserCompany';
import { UserEmail } from './UserEmail';
import { UserLocation } from './UserLocation';
import { UserTwitter } from './UserTwitter';
import { UserWebsite } from './UserWebsite';
import styles from './UserContact.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserContact = ({ user }: Props): JSX.Element => (
  <div className={styles['user-contact']}>
    <UserCompany user={user} />
    <UserLocation user={user} />
    <UserEmail user={user} />
    <UserWebsite user={user} />
    <UserTwitter user={user} />
  </div>
);
