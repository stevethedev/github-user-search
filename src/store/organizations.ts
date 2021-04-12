import merge from 'lodash/merge';
import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { ReadonlyDeep } from 'type-fest';
import type { Organization } from '../api/organization/type';
import type { State, StateAccessors } from './state';
import {
  action, addReducer, addState, isAction,
} from './state';

const SET_ORGANIZATIONS: unique symbol = Symbol('SET_ORGANIZATIONS');
type SET_ORGANIZATIONS = typeof SET_ORGANIZATIONS;

export type OrganizationIndex = Organization['id'];
export type Organizations = Record<OrganizationIndex, Organization | undefined>;

interface OrganizationsState extends State {
  readonly organizations: ReadonlyDeep<Organizations>;
}

interface SetOrganizationsAction extends Action<SET_ORGANIZATIONS> {
  readonly organizations: ReadonlyDeep<Organizations>;
}

const mergeOrganization = (
  base: ReadonlyDeep<Organization> | undefined,
  extend: ReadonlyDeep<Organization> | undefined,
): ReadonlyDeep<Organization> | undefined => (
  extend
    ? { ...base, ...extend }
    : undefined
);

const mergeOrganizations = (
  base: ReadonlyDeep<Organizations>,
  extend: ReadonlyDeep<Organizations>,
): ReadonlyDeep<Organizations> => (
  Object.keys(extend).reduce((organizations, id: keyof typeof extend) => {
    const organization = extend[id];
    // Save some assignments here by disabling the linter.
    // eslint-disable-next-line no-param-reassign
    organizations[id] = mergeOrganization(organizations[id], organization);
    return organizations;
  }, { ...base })
);

addState<OrganizationsState>((state) => ({ ...state, organizations: Object.create(null) }));

addReducer<OrganizationsState>((state, a) => {
  if (isAction<SetOrganizationsAction>(a, SET_ORGANIZATIONS)) {
    return {
      ...state,
      organizations: mergeOrganizations(state.organizations, a.organizations),
    };
  }

  return state;
});

/**
 * Retrieve the current search-count from the store.
 */
export const useOrganizations = (): StateAccessors<Organizations> => {
  const dispatch = useDispatch();
  return [
    useSelector((state: OrganizationsState) => state.organizations),
    (organizations) => dispatch(
      action<SetOrganizationsAction>({ type: SET_ORGANIZATIONS, organizations }),
    ),
  ];
};

export const useOrganization = (id: OrganizationIndex): ReadonlyDeep<Organization> | null => (
  useSelector(({ organizations }: OrganizationsState) => organizations[id]) ?? null
);
