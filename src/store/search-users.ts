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

const SEARCH_USERS: unique symbol = Symbol('SEARCH_USERS');

interface SearchUsersState extends State {
  readonly [SEARCH_USERS]: SearchUsers;
}

interface SetSearchUsersStateAction extends Action<typeof SEARCH_USERS> {
  readonly [SEARCH_USERS]: SearchUsers;
}

addState<SearchUsersState>((state) => ({ ...state, [SEARCH_USERS]: [] }));

addReducer<SearchUsersState>((state, a) => {
  if (isAction<SetSearchUsersStateAction>(a, SEARCH_USERS)) {
    return { ...state, [SEARCH_USERS]: a[SEARCH_USERS] };
  }
  return state;
});

export const useSearchUsers = (): StateAccessors<User[]> => {
  const [users] = useUsers();
  const dispatch = useDispatch();
  return [
    useSelector((state: SearchUsersState) => (
      state[SEARCH_USERS].map((id) => users[id]).filter(isObject) as User[])),
    (userIds) => {
      const searchUsers = userIds.reduce<User['id'][]>((acc, user) => {
        const id = user?.id;
        if (id) {
          acc.push(id);
        }
        return acc;
      }, []);
      return dispatch(action<SetSearchUsersStateAction>({
        type: SEARCH_USERS,
        [SEARCH_USERS]: searchUsers,
      }));
    },
  ];
};
