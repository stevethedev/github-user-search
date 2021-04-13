import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../store/store';

export const Test = ({ children }: React.PropsWithChildren<unknown>): JSX.Element => (
  <Provider store={createStore()}>{children}</Provider>
);
