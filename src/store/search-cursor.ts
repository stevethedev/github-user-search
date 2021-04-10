import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  action,
  addReducer, addState, isAction, State, StateAccessors,
} from './state';

interface SearchCursorState extends State {
  searchCursor: string | null;
}

interface SetSearchCursorAction extends Action<'SET_SEARCH_CURSOR'> {
  searchCursor: string | null;
}

addState((state) => ({ ...state, searchCursor: null }));

addReducer((state, a) => {
  if (isAction<SetSearchCursorAction>(a, 'SET_SEARCH_CURSOR')) {
    return { ...state, searchCursor: a.searchCursor };
  }
  return state;
});

/**
 * Retrieve the current search-count from the store.
 */
export const useSearchCursor = (): StateAccessors<SearchCursorState['searchCursor']> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: SearchCursorState) => state.searchCursor),
    (searchCursor) => dispatch(action<SetSearchCursorAction>({ type: 'SET_SEARCH_CURSOR', searchCursor })),
  ];
};
