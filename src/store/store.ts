import type { Store } from 'redux';
import { createStore as createStoreBase } from 'redux';
import type { State } from './state';
import { reducer } from './state';

export const createStore = (): Store<State> => createStoreBase(reducer);
