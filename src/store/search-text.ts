import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { State, StateAccessors } from './state';
import {
  action, addReducer, addState, isAction,
} from './state';

export type SearchText = string | null;

const SET_SEARCH_TEXT: unique symbol = Symbol('SET_SEARCH_TEXT');
type SET_SEARCH_TEXT = typeof SET_SEARCH_TEXT;

interface SearchTextState extends State {
  readonly searchText: SearchText;
}

interface SetSearchTextAction extends Action<SET_SEARCH_TEXT> {
  searchText: SearchText;
}

addState<SearchTextState>((state) => ({
  ...state,
  searchText: null,
}));

addReducer<SearchTextState>((state, a) => {
  if (isAction<SetSearchTextAction>(a, SET_SEARCH_TEXT)) {
    return { ...state, searchText: a.searchText };
  }
  return state;
});

/**
 * Retrieve the current search-text from the store.
 */
export const useSearchText = (): StateAccessors<SearchText> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: SearchTextState) => state.searchText),
    (searchText) => dispatch(action<SetSearchTextAction>({ type: SET_SEARCH_TEXT, searchText })),
  ];
};
