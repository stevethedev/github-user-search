import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { User } from '../../api/user/type';
import type { State, StateAccessors } from '../state';
import {
  action, addReducer, addState, isAction,
} from '../state';
import type { UserIndex } from './users';
import { useUsers } from './users';

const USER: unique symbol = Symbol('USER');

interface UserState extends State {
  readonly [USER]: UserIndex | null;
}

interface SetUserStateAction extends Action<typeof USER> {
  readonly [USER]: UserState[typeof USER];
}

addState<UserState>((state) => ({
  ...state,
  [USER]: null,
}));
addReducer<UserState>((state, a) => {
  if (isAction<SetUserStateAction>(a, USER)) {
    return {
      ...state,
      [USER]: a[USER],
    };
  }
  return state;
});

export const useUser = (): StateAccessors<User | null> => {
  const dispatch = useDispatch();
  const [users] = useUsers();
  return [
    useSelector(({ [USER]: user }: UserState) => users[user ?? ''] ?? null),
    (user) => void dispatch(
      action<SetUserStateAction>({
        type: USER,
        [USER]: user?.id ?? null,
      }),
    ),
  ];
};
