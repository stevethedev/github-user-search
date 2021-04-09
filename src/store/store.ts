import { createStore as createStoreBase, Store } from 'redux';
import { reducer, State } from './state';

export const createStore = (): Store<State> => createStoreBase(reducer);
