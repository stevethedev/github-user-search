import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { Repository } from '../api/repository/type';
import type { User } from '../api/user/type';
import { Button } from '../components/Button';
import { RepositoryList } from '../components/RepositoryList';
import { UserContact } from '../components/UserContact';
import { UserInfo } from '../components/UserInfo';
import { UserInteractions } from '../components/UserInteractions';
import { UserMessage } from '../components/UserMessage';
import { UserOrganization } from '../components/UserOrganization';
import type { RepositoryIndex } from '../store/data/repositories';
import { useRepositories } from '../store/data/repositories';
import { useUser } from '../store/data/user';
import styles from './UserPage.module.css';

const getPinnable = (
  { pinnedItems, pinnableItems }: ReadonlyDeep<User>,
): null | { title: string, content: Readonly<RepositoryIndex[]> } => {
  if (pinnedItems?.ids.length) {
    return { title: 'Pinned Content', content: pinnedItems.ids };
  }

  if (pinnableItems?.ids.length) {
    return { title: 'Pinnable Content', content: pinnableItems.ids };
  }

  return null;
};

export const UserPage = (): JSX.Element => {
  const [user] = useUser();

  if (!user) {
    return (<article>No User Selected</article>);
  }

  const [repositories] = useRepositories();

  const pins = getPinnable(user);

  return (
    <article className={styles['user-page']}>
      <section className={styles['user-page__user-info']}>
        <UserInfo user={user} />
        <div className={styles['user-page__user-button']}>
          <Button label="Open on GitHub" href={user.url} color="blue" />
        </div>
        <div className={styles['user-page__user-interactions']}>
          <UserInteractions user={user} />
        </div>
        <div className={styles['user-page__user-contact']}>
          <UserContact user={user} />
        </div>
        <div className={styles['user-page__user-organization']}>
          <UserOrganization user={user} />
        </div>
      </section>
      <section className={styles['user-page__user-data']}>
        <span className={styles['user-page__user-message']} style={{ display: user.status ? '' : 'none' }}>
          <UserMessage user={user} />
        </span>
        {pins ? (
          <div>
            <span>{pins.title}</span>
            <div className={styles['user-page__repository-list']}>
              <RepositoryList
                repositories={(pins.content.map(
                  (id) => repositories[id],
                ) ?? []).filter((n) => n) as Repository[]}
              />
            </div>
          </div>
        ) : '' }
      </section>
    </article>
  );
};
