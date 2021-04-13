import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { State, StateAccessors } from '../state';
import {
  action, addReducer, addState, isAction,
} from '../state';

export type SearchCount = number;

const SEARCH_COUNT: unique symbol = Symbol('SEARCH_COUNT');

interface SearchCountState extends State {
  readonly [SEARCH_COUNT]: SearchCount;
}

interface SetSearchCountAction extends Action<typeof SEARCH_COUNT> {
  [SEARCH_COUNT]: SearchCount;
}

addState<SearchCountState>((state) => ({
  ...state,
  [SEARCH_COUNT]: 0,
}));

addReducer<SearchCountState>((state, a) => {
  if (isAction<SetSearchCountAction>(a, SEARCH_COUNT)) {
    return { ...state, [SEARCH_COUNT]: a[SEARCH_COUNT] };
  }
  return state;
});

/**
 * Retrieve the current search-count from the store.
 */
export const useSearchCount = (): StateAccessors<SearchCountState[typeof SEARCH_COUNT]> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: SearchCountState) => state[SEARCH_COUNT]),
    (searchCount) => dispatch(
      action<SetSearchCountAction>({ type: SEARCH_COUNT, [SEARCH_COUNT]: searchCount }),
    ),
  ];
};
