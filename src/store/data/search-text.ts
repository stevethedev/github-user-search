import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { State, StateAccessors } from '../state';
import {
  action, addReducer, addState, isAction,
} from '../state';

export type SearchText = string | null;

const SEARCH_TEXT: unique symbol = Symbol('SEARCH_TEXT');

interface SearchTextState extends State {
  readonly [SEARCH_TEXT]: SearchText;
}

interface SetSearchTextAction extends Action<typeof SEARCH_TEXT> {
  readonly [SEARCH_TEXT]: SearchText;
}

addState<SearchTextState>((state) => ({
  ...state,
  [SEARCH_TEXT]: null,
}));

addReducer<SearchTextState>((state, a) => {
  if (isAction<SetSearchTextAction>(a, SEARCH_TEXT)) {
    return { ...state, [SEARCH_TEXT]: a[SEARCH_TEXT] };
  }
  return state;
});

/**
 * Retrieve the current search-text from the store.
 */
export const useSearchText = (): StateAccessors<SearchText> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: SearchTextState) => state[SEARCH_TEXT]),
    (searchText) => void dispatch(
      action<SetSearchTextAction>({ type: SEARCH_TEXT, [SEARCH_TEXT]: searchText }),
    ),
  ];
};
