import React from 'react';
import type { ReadonlyDeep } from 'type-fest';
import type { Language as LanguageType } from '../api/repository/type';
import styles from './Language.module.css';

interface Props {
  language: ReadonlyDeep<LanguageType>;
}

export const Language = ({ language }: Props): JSX.Element => (
  <span className={styles.language}>
    <span className={styles.language__color} style={{ backgroundColor: language.color }} />
    <span className={styles.language__text}>{language.name}</span>
  </span>
);
