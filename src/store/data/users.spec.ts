/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react-hooks';
import { createStore } from '../store';
import { Test } from '../../containers/Test';
import { useUsers } from './users';
import type { User } from '../../api/user/type';

const getStore = () => renderHook(() => {
  createStore();
  const [getter, setter] = useUsers();
  return { getter, setter };
}, {
  wrapper: Test,
});

it('automatically registers to the store', () => {
  const { result } = getStore();
  expect(result.current.getter).toEqual({});
});

it('can update the stored values', () => {
  const { result } = getStore();
  const userA = { id: 'a' } as User;
  const userB = { id: 'b' } as User;

  act(() => result.current.setter({
    [userA.id]: userA,
    [userB.id]: userB,
  }));
  expect(result.current.getter).toEqual({
    [userA.id]: userA,
    [userB.id]: userB,
  });
});

it('can modify users', () => {
  const { result } = getStore();
  const userA = { id: 'a' } as User;
  const userB = { id: 'b', name: 'bar', twitterUsername: 'bar' } as User;
  const userC = { id: 'b', name: 'foo' } as User;

  act(() => result.current.setter({
    [userA.id]: userA,
    [userB.id]: userB,
  }));
  act(() => result.current.setter({
    [userB.id]: userC,
  }));
  expect(result.current.getter).toEqual({
    [userA.id]: userA,
    [userB.id]: { ...userB, ...userC },
  });
});
