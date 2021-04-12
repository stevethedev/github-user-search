import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { Organization } from '../api/organization/type';
import styles from './OrganizationList.module.css';
import { OrganizationListItem } from './OrganizationListItem';

interface Props {
  organizations: ReadonlyDeep<Organization[]>;
}

export const OrganizationList = ({ organizations }: Props): JSX.Element => (
  <ol className={styles['organization-list']}>
    {organizations.map((organization) => (
      <OrganizationListItem key={organization.id} organization={organization} />
    ))}
  </ol>
);
