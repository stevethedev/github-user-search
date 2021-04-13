import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { ReadonlyDeep } from 'type-fest';
import type { User } from '../../api/user/type';
import type { State, StateAccessors } from '../state';
import {
  action, addReducer, addState, isAction,
} from '../state';

export type UserIndex = User['id'];
export type Users = Record<UserIndex, User | undefined>;

const USERS: unique symbol = Symbol('USERS');

interface UsersState extends State {
  readonly [USERS]: ReadonlyDeep<Users>;
}

interface SetUsersAction extends Action<typeof USERS> {
  readonly [USERS]: ReadonlyDeep<Users>;
}

const mergeUser = (
  base: ReadonlyDeep<User> | undefined,
  extend: ReadonlyDeep<User> | undefined,
): ReadonlyDeep<User> | undefined => (
  extend
    ? { ...base, ...extend }
    : undefined
);

const mergeUsers = (
  base: ReadonlyDeep<Users>,
  extend: ReadonlyDeep<Users>,
): ReadonlyDeep<Users> => (
  Object.keys(extend).reduce((users, id: keyof typeof extend) => {
    const user = extend[id];
    // Save some assignments here by disabling the linter.
    // eslint-disable-next-line no-param-reassign
    users[id] = mergeUser(users[id], user);
    return users;
  }, { ...base })
);

addState<UsersState>((state) => ({ ...state, [USERS]: Object.create(null) }));

addReducer<UsersState>((state, a) => {
  if (isAction<SetUsersAction>(a, USERS)) {
    return {
      ...state,
      [USERS]: mergeUsers(state[USERS], a[USERS]),
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
    useSelector((state: UsersState) => state[USERS]),
    (users) => dispatch(action<SetUsersAction>({ type: USERS, [USERS]: users })),
  ];
};
