import { useDispatch, useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { ReadonlyDeep } from 'type-fest';
import type { Organization } from '../../api/organization/type';
import type { State, StateAccessors } from '../state';
import {
  action, addReducer, addState, isAction,
} from '../state';

const ORGANIZATIONS: unique symbol = Symbol('ORGANIZATIONS');

export type OrganizationIndex = Organization['id'];
export type Organizations = Record<OrganizationIndex, Organization | undefined>;

interface OrganizationsState extends State {
  readonly [ORGANIZATIONS]: ReadonlyDeep<Organizations>;
}

interface SetOrganizationsAction extends Action<typeof ORGANIZATIONS> {
  readonly [ORGANIZATIONS]: ReadonlyDeep<Organizations>;
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

addState<OrganizationsState>((state) => ({ ...state, [ORGANIZATIONS]: Object.create(null) }));

addReducer<OrganizationsState>((state, a) => {
  if (isAction<SetOrganizationsAction>(a, ORGANIZATIONS)) {
    return {
      ...state,
      [ORGANIZATIONS]: mergeOrganizations(state[ORGANIZATIONS], a[ORGANIZATIONS]),
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
    useSelector((state: OrganizationsState) => state[ORGANIZATIONS]),
    (organizations) => void dispatch(
      action<SetOrganizationsAction>({ type: ORGANIZATIONS, [ORGANIZATIONS]: organizations }),
    ),
  ];
};
