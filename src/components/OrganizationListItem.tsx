import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { Organization } from '../api/organization/type';
import { Button } from './Button';
import styles from './OrganizationListItem.module.css';

interface Props {
  organization: ReadonlyDeep<Organization>;
}

export const OrganizationListItem = ({ organization }: Props): JSX.Element => (
  <li className={styles['organization-list-item']}>
    <Button
      href={organization.websiteUrl}
      borderless
      inline="text"
      label={(
        <img
          className={styles['organization-list-item__avatar']}
          src={organization.avatarUrl}
          alt={organization.name}
        />
      )}
    />
  </li>
);
