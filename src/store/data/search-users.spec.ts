/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react-hooks';
import { createStore } from '../store';
import { Test } from '../../containers/Test';
import { useSearchUsers } from './search-users';
import type { User } from '../../api/user/type';
import { useUsers } from './users';

const getStore = () => renderHook(() => {
  createStore();
  const [getter, setter] = useSearchUsers();
  const [, setUsers] = useUsers();
  return { getter, setter, setUsers };
}, {
  wrapper: Test,
});

it('automatically registers to the store', () => {
  const { result } = getStore();
  expect(result.current.getter).toEqual([]);
});

it('can update the stored values', () => {
  const { result } = getStore();
  const userA = { id: 'a' } as User;
  const userB = { id: 'b' } as User;
  const userC = { id: 'c' } as User;

  act(() => result.current.setUsers({
    [userA.id]: userA,
    [userB.id]: userB,
  }));
  act(() => result.current.setter([userA, userC]));
  expect(result.current.getter).toEqual([userA]);
});
