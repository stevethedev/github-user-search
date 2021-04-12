import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import { read } from '../api/user/read';
import type { User } from '../api/user/type';
import type { Organizations } from './organizations';
import { useOrganizations } from './organizations';
import type { Repositories } from './repositories';
import { useRepositories } from './repositories';
import type { State, StateAccessors } from './state';
import {
  action, addReducer, addState, isAction,
} from './state';
import { useToken } from './token';
import type { UserIndex } from './users';
import { useUsers } from './users';

interface UserState extends State {
  user: UserIndex | null;
}

const SET_USER_STATE: unique symbol = Symbol('SET_USER_STATE');
type SET_USER_STATE = typeof SET_USER_STATE;

interface SetUserStateAction extends Action<SET_USER_STATE> {
  user: UserState['user'];
}

addState<UserState>((state) => ({ ...state, user: null }));
addReducer<UserState>((state, a) => {
  if (isAction<SetUserStateAction>(a, SET_USER_STATE)) {
    return { ...state, user: a.user };
  }
  return state;
});

export const useUser = (): StateAccessors<User | null> => {
  const dispatch = useDispatch();
  const [users] = useUsers();
  return [
    useSelector(({ user }: UserState) => users[user ?? ''] ?? null),
    (user) => dispatch(
      action<SetUserStateAction>({ type: SET_USER_STATE, user: user?.id ?? null }),
    ),
  ];
};

export type FetchUser = (text: string | null) => Promise<void>;

export const useFetchUser = (): FetchUser => {
  const [token] = useToken();
  const [, setUsers] = useUsers();
  const [, setUser] = useUser();
  const [, setRepositories] = useRepositories();
  const [, setOrganizations] = useOrganizations();

  return async (login: string | null) => {
    if (!login) {
      setUser(null);
      return;
    }

    const results = await read(token, { login });
    if (!results?.user) {
      setUser(null);
      return;
    }

    const { organizations, repositories, user } = results;

    setUsers({ [user.id]: user });

    setRepositories(repositories.reduce<Repositories>((acc, repo) => {
      acc[repo.id] = repo;
      return acc;
    }, {}));
    setOrganizations(organizations.reduce<Organizations>((acc, organization) => {
      acc[organization.id] = organization;
      return acc;
    }, {}));
  };
};
