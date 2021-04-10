import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../store/store';
import styles from './App.module.css';
import { PageController } from './PageController';

export const App = (): JSX.Element => (
  <Provider store={createStore()}>
    <section className={styles.app}>
      <PageController />
    </section>
  </Provider>
);
