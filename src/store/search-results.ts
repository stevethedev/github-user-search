import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  action,
  addReducer, addState, isAction, State, StateAccessors,
} from './state';
import { User } from '../api/user';

interface SearchResultsState extends State {
  searchResults: { [page: number]: User[] };
}

interface SetSearchResultsAction extends Action<'SET_SEARCH_RESULTS'> {
  searchResults: { [page: number]: User[] };
}

interface PutSearchResultsAction extends Action<'PUT_SEARCH_RESULTS'> {
  searchResults: { [page: number]: User[] };
}

addState<SearchResultsState>((state) => ({ ...state, searchResults: Object.create(null) }));

addReducer<SearchResultsState>((state, a) => {
  if (isAction<SetSearchResultsAction>(a, 'SET_SEARCH_RESULTS')) {
    return { ...state, searchResults: a.searchResults };
  }
  if (isAction<PutSearchResultsAction>(a, 'PUT_SEARCH_RESULTS')) {
    return { ...state, searchResults: { ...state.searchResults, ...a.searchResults } };
  }
  return state;
});

/**
 * Retrieve the current search-count from the store.
 */
export const useSearchResults = (): StateAccessors<SearchResultsState['searchResults']> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: SearchResultsState) => state.searchResults),
    (searchResults) => dispatch(action<SetSearchResultsAction>({ type: 'SET_SEARCH_RESULTS', searchResults })),
  ];
};

export const usePutSearchResults = (): (r: SearchResultsState['searchResults']) => void => {
  const dispatch = useDispatch();
  return (searchResults) => dispatch(action<PutSearchResultsAction>({ type: 'PUT_SEARCH_RESULTS', searchResults }));
};
