import React from 'react';
import styles from './PageFooter.module.css';

export const PageFooter = (): JSX.Element => (
  <footer className={styles['page-footer']}>
    <span className={styles['page-footer__copyright']}>&copy; 2021 Steven Jimenez</span>
  </footer>
);
