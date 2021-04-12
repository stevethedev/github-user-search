import React from 'react';
import { Button } from '../components/Button';
import { UserContact } from '../components/UserContact';
import { UserInfo } from '../components/UserInfo';
import { UserInteractions } from '../components/UserInteractions';
import { UserMessage } from '../components/UserMessage';
import { UserOrganization } from '../components/UserOrganization';
import { useUser } from '../store/user';
import styles from './UserPage.module.css';

export const UserPage = (): JSX.Element => {
  const [user] = useUser();

  if (!user) {
    return (<article>No User Selected</article>);
  }

  return (
    <article className={styles['user-page']}>
      <section className={styles['user-page__user-info']}>
        <UserInfo user={user} />
        <div className={styles['user-page__user-button']}>
          <Button label="Open on GitHub" onClick={() => window.open(user.url)} color="blue" />
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
        <span className={styles['user-page__user-message']}>
          <UserMessage user={user} />
        </span>
        <div>
          <span>
            {user.pinnedItems?.totalCount}
            {' '}
            Pinned Items
          </span>
          {/* <div>{user.pinnedItems?.ids}</div> */}
        </div>
        <div>
          <span>
            {user.pinnableItems?.totalCount}
            {' '}
            Pinnable Items
          </span>
          {/* <div>{user.pinnableItems?.ids}</div> */}
        </div>
      </section>
    </article>
  );
};
