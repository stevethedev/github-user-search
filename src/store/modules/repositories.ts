import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { ReadonlyDeep } from 'type-fest';
import type { Repository } from '../../api/repository/type';
import type { State, StateAccessors } from '../state';
import {
  action, addReducer, addState, isAction,
} from '../state';

const REPOSITORIES: unique symbol = Symbol('REPOSITORIES');

export type RepositoryIndex = Repository['id'];
export type Repositories = Record<RepositoryIndex, Repository | undefined>;

interface RepositoriesState extends State {
  readonly [REPOSITORIES]: ReadonlyDeep<Repositories>;
}

interface SetRepositoriesAction extends Action<typeof REPOSITORIES> {
  readonly [REPOSITORIES]: ReadonlyDeep<Repositories>;
}

const mergeRepository = (
  base: ReadonlyDeep<Repository> | undefined,
  extend: ReadonlyDeep<Repository> | undefined,
): ReadonlyDeep<Repository> | undefined => (
  extend
    ? { ...base, ...extend }
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

addState<RepositoriesState>((state) => ({ ...state, [REPOSITORIES]: Object.create(null) }));

addReducer<RepositoriesState>((state, a) => {
  if (isAction<SetRepositoriesAction>(a, REPOSITORIES)) {
    return {
      ...state,
      [REPOSITORIES]: mergeRepositories(state[REPOSITORIES], a[REPOSITORIES]),
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
    useSelector((state: RepositoriesState) => state[REPOSITORIES]),
    (repositories) => dispatch(
      action<SetRepositoriesAction>({ type: REPOSITORIES, [REPOSITORIES]: repositories }),
    ),
  ];
};
