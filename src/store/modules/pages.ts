import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { State, StateAccessors } from '../state';
import {
  action, addReducer, addState, isAction,
} from '../state';

const PAGES: unique symbol = Symbol('PAGES');

export enum Page {
  Search,
  Users,
  User,
}

interface PageState extends State {
  readonly [PAGES]: Page;
}

interface SetPageAction extends Action<typeof PAGES> {
  readonly [PAGES]: Page;
}

addReducer<PageState>((state, a) => {
  if (isAction<SetPageAction>(a, PAGES)) {
    return { ...state, [PAGES]: a[PAGES] };
  }
  return state;
});

addState<PageState>((state) => ({
  ...state,
  [PAGES]: Page.Search,
}));

/**
 * Retrieves the currently selected page-value from the store.
 */
export const usePage = (): StateAccessors<PageState[typeof PAGES]> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: PageState) => state[PAGES]),
    (page) => void dispatch(action<SetPageAction>({ type: PAGES, [PAGES]: page })),
  ];
};
