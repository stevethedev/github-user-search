import merge from 'lodash/merge';
import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { ReadonlyDeep } from 'type-fest';
import type { Repository } from '../api/repository/type';
import type { State, StateAccessors } from './state';
import {
  action, addReducer, addState, isAction,
} from './state';

const SET_REPOSITORIES: unique symbol = Symbol('SET_REPOSITORIES');
type SET_REPOSITORIES = typeof SET_REPOSITORIES;

export type RepositoryIndex = Repository['id'];
export type Repositories = Record<RepositoryIndex, Repository | undefined>;

interface RepositoriesState extends State {
  readonly repositories: ReadonlyDeep<Repositories>;
}

interface SetRepositoriesAction extends Action<SET_REPOSITORIES> {
  readonly repositories: ReadonlyDeep<Repositories>;
}

const mergeRepository = (
  base: ReadonlyDeep<Repository> | undefined,
  extend: ReadonlyDeep<Repository> | undefined,
): ReadonlyDeep<Repository> | undefined => (
  extend
    ? merge({}, base, extend)
    : undefined
);

const mergeRepositories = (
  base: ReadonlyDeep<Repositories>,
  extend: ReadonlyDeep<Repositories>,
): ReadonlyDeep<Repositories> => (
  Object.keys(extend).reduce((repositories, id: keyof typeof extend) => {
    const repository = extend[id];
    // Save some assignments here by disabling the linter.
    // eslint-disable-next-line no-param-reassign
    repositories[id] = mergeRepository(repositories[id], repository);
    return repositories;
  }, { ...base })
);

addState<RepositoriesState>((state) => ({ ...state, repositories: Object.create(null) }));

addReducer<RepositoriesState>((state, a) => {
  if (isAction<SetRepositoriesAction>(a, SET_REPOSITORIES)) {
    return {
      ...state,
      repositories: mergeRepositories(state.repositories, a.repositories),
    };
  }

  return state;
});

/**
 * Retrieve the current search-count from the store.
 */
export const useRepositories = (): StateAccessors<Repositories> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: RepositoriesState) => state.repositories),
    (repositories) => dispatch(
      action<SetRepositoriesAction>({ type: SET_REPOSITORIES, repositories }),
    ),
  ];
};
