import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import type { State, StateAccessors } from './state';
import {
  action, addReducer, addState, isAction,
} from './state';

export enum Page {
  Search,
  Results,
}

interface PageState extends State {
  readonly page: Page;
}

addReducer((state, a) => {
  if (isAction<SetPageAction>(a, 'SET_PAGE')) {
    return { ...state, page: a.page };
  }
  return state;
});

addState<PageState>((state) => ({
  ...state,
  page: Page.Search,
}));

/**
 * Retrieves the currently selected page-value from the store.
 */
export const usePage = (): StateAccessors<PageState['page']> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: PageState) => state.page),
    (page) => dispatch(action<SetPageAction>({ type: 'SET_PAGE', page })),
  ];
};

interface SetPageAction extends Action<'SET_PAGE'> {
  page: Page;
}
