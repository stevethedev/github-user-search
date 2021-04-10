import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import type { State, StateAccessors } from './state';
import {
  action, addReducer, addState, isAction,
} from './state';

interface SearchTextState extends State {
  readonly searchText: string | null;
}

addState<SearchTextState>((state) => ({
  ...state,
  searchText: null,
}));

addReducer((state, a) => {
  if (isAction<SetSearchTextAction>(a, 'SET_SEARCH_TEXT')) {
    return { ...state, searchText: a.searchText };
  }
  return state;
});

/**
 * Retrieve the current search-text from the store.
 */
export const useSearchText = (): StateAccessors<SearchTextState['searchText']> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: SearchTextState) => state.searchText),
    (searchText) => dispatch(action<SetSearchTextAction>({ type: 'SET_SEARCH_TEXT', searchText })),
  ];
};

interface SetSearchTextAction extends Action<'SET_SEARCH_TEXT'> {
  searchText: string | null;
}
