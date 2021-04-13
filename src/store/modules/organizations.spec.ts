/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react-hooks';
import { createStore } from '../store';
import { useOrganizations } from './organizations';
import type { Organization } from '../../api/organization/type';
import { Test } from '../../containers/Test';

const getStore = () => renderHook(() => {
  createStore();
  const [organizations, setOrganizations] = useOrganizations();
  return { organizations, setOrganizations };
}, {
  wrapper: Test,
});

it('automatically registers to the store', () => {
  const { result } = getStore();
  expect(result.current.organizations).toEqual({});
});

it('can update the organization values', () => {
  const { result } = getStore();
  const ORGANIZATION: Organization = { id: 'foo' } as Organization;
  act(() => result.current.setOrganizations({ [ORGANIZATION.id]: ORGANIZATION }));
  expect(result.current.organizations).toEqual({ [ORGANIZATION.id]: ORGANIZATION });
});

it('can merge the organization values', () => {
  const { result } = getStore();
  const ORGANIZATION: Organization = { id: 'foo', avatarUrl: 'foo' } as Organization;
  const ADD_ORGANIZATION: Organization = { id: 'foo', avatarUrl: 'bar' } as Organization;
  act(() => result.current.setOrganizations({ [ORGANIZATION.id]: ORGANIZATION }));
  act(() => result.current.setOrganizations({ [ORGANIZATION.id]: ADD_ORGANIZATION }));
  expect(result.current.organizations).toEqual({
    [ORGANIZATION.id]: {
      ...ORGANIZATION,
      ...ADD_ORGANIZATION,
    },
  });
});
