import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  action,
  addReducer, addState, isAction, State, StateAccessors,
} from './state';
import { User } from '../api/user';

export interface Users {
  [id: string]: User | undefined;
}

interface UsersState extends State {
  users: Users;
}

interface SetUsersAction extends Action<'SET_USERS'> {
  users: Users;
}

const mergeUser = (base: User | undefined, extend: User | undefined): User | undefined => (
  extend ? { ...base, ...extend } : undefined
);

const mergeUsers = (base: Users, extend: Users): Users => (
  Object.keys(extend).reduce<Users>((users, id: keyof typeof extend) => {
    const user = extend[id];
    // Save some assignments here by disabling the linter.
    // eslint-disable-next-line no-param-reassign
    users[id] = mergeUser(users[id], user);
    return users;
  }, { ...base })
);

addState<UsersState>((state) => ({ ...state, users: Object.create(null) }));

addReducer<UsersState>((state, a) => {
  if (isAction<SetUsersAction>(a, 'SET_USERS')) {
    return {
      ...state,
      users: mergeUsers(state.users, a.users),
    };
  }

  return state;
});

/**
 * Retrieve the current search-count from the store.
 */
export const useUsers = (): StateAccessors<Users> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: UsersState) => state.users),
    (users) => dispatch(action<SetUsersAction>({ type: 'SET_USERS', users })),
  ];
};
