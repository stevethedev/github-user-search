/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react-hooks';
import { createStore } from '../store';
import { Test } from '../../containers/Test';
import { useRepositories } from './repositories';
import type { Repository } from '../../api/repository/type';

const getStore = () => renderHook(() => {
  createStore();
  const [repositories, setRepositories] = useRepositories();
  return { repositories, setRepositories };
}, {
  wrapper: Test,
});

it('automatically registers to the store', () => {
  const { result } = getStore();
  expect(result.current.repositories).toEqual({});
});

it('can update the repository values', () => {
  const { result } = getStore();
  const REPOSITORY = { id: 'foo', name: 'foobar' } as Repository;
  act(() => result.current.setRepositories({ [REPOSITORY.id]: REPOSITORY }));
  expect(result.current.repositories).toEqual({ [REPOSITORY.id]: REPOSITORY });
});

it('can merge repository values', () => {
  const { result } = getStore();
  const REPOSITORY = { id: 'foo', name: 'foobar' } as Repository;
  const REPOSITORY2 = { id: 'foo', name: 'barfoo' } as Repository;
  act(() => result.current.setRepositories({ [REPOSITORY.id]: REPOSITORY }));
  act(() => result.current.setRepositories({ [REPOSITORY.id]: REPOSITORY2 }));
  expect(result.current.repositories).toEqual({ [REPOSITORY.id]: REPOSITORY2 });
});
