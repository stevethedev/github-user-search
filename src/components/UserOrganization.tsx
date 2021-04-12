import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { Organization } from '../api/organization/type';
import type { User } from '../api/user/type';
import { useOrganizations } from '../store/organizations';
import { OrganizationList } from './OrganizationList';
import styles from './UserOrganization.module.css';

interface Props {
  user: ReadonlyDeep<User>;
}

export const UserOrganization = ({ user }: Props): JSX.Element => {
  const [orgs] = useOrganizations();
  const organizations = (user.organizations?.ids ?? [])
    .map((id) => orgs[id])
    .filter((n) => n) as Organization[];
  return (
    <div className={styles['user-organization']}>
      <span className={styles['user-organization__header']}>
        {user.organizations?.totalCount.toLocaleString()}
        {' '}
        {user.organizations?.totalCount === 1 ? 'Organization' : 'Organizations'}
      </span>
      <OrganizationList organizations={organizations} />
    </div>
  );
};
