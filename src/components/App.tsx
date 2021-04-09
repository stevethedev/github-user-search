import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../store/store';
import styles from './App.module.css';

export const App = (): JSX.Element => (
  <Provider store={createStore()}>
    <h1 className={styles.app}>Hello, world!</h1>
  </Provider>
);
