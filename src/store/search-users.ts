import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { User } from '../api/user/type';
import { isObject } from '../util/types';
import type { State, StateAccessors } from './state';
import {
  action, addReducer, addState, isAction,
} from './state';
import { useUsers } from './users';

export type SearchUsers = ReadonlyArray<User['id']>;

const SET_SEARCH_USERS: unique symbol = Symbol('SET_SEARCH_USERS');
type SET_SEARCH_USERS = typeof SET_SEARCH_USERS;

interface SearchUsersState extends State {
  readonly searchUsers: SearchUsers;
}

interface SetSearchUsersStateAction extends Action<SET_SEARCH_USERS> {
  readonly searchUsers: SearchUsers;
}

addState<SearchUsersState>((state) => ({ ...state, searchUsers: [] }));

addReducer<SearchUsersState>((state, a) => {
  if (isAction<SetSearchUsersStateAction>(a, SET_SEARCH_USERS)) {
    return { ...state, searchUsers: a.searchUsers };
  }
  return state;
});

export const useSearchUsers = (): StateAccessors<User[]> => {
  const [users] = useUsers();
  const dispatch = useDispatch();
  return [
    useSelector((state: SearchUsersState) => (
      state.searchUsers.map((id) => users[id]).filter(isObject) as User[])),
    (userIds) => {
      const searchUsers = userIds.reduce<User['id'][]>((acc, user) => {
        const id = user?.id;
        if (id) {
          acc.push(id);
        }
        return acc;
      }, []);
      return dispatch(action<SetSearchUsersStateAction>({
        type: SET_SEARCH_USERS,
        searchUsers,
      }));
    },
  ];
};
