import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { State, StateAccessors } from './state';
import {
  action, addReducer, addState, isAction,
} from './state';

export type SearchCount = number;

const SET_SEARCH_COUNT: unique symbol = Symbol('SET_SEARCH_COUNT');
type SET_SEARCH_COUNT = typeof SET_SEARCH_COUNT;

interface SearchCountState extends State {
  readonly searchCount: SearchCount;
}

interface SetSearchCountAction extends Action<SET_SEARCH_COUNT> {
  searchCount: SearchCount;
}

addState<SearchCountState>((state) => ({
  ...state,
  searchCount: 0,
}));

addReducer<SearchCountState>((state, a) => {
  if (isAction<SetSearchCountAction>(a, SET_SEARCH_COUNT)) {
    return { ...state, searchCount: a.searchCount };
  }
  return state;
});

/**
 * Retrieve the current search-count from the store.
 */
export const useSearchCount = (): StateAccessors<SearchCountState['searchCount']> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: SearchCountState) => state.searchCount),
    (searchCount) => dispatch(
      action<SetSearchCountAction>({ type: SET_SEARCH_COUNT, searchCount }),
    ),
  ];
};
