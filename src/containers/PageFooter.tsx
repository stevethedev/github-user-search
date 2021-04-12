import React from 'react';
import styles from './PageFooter.module.css';

interface Props {
}

export const PageFooter = ({ ...rest }: Props): JSX.Element => (
  <footer className={styles['page-footer']}>
    <span className={styles['page-footer__copyright']}>&copy; 2021 Steven Jimenez</span>
  </footer>
);
