/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react-hooks';
import { createStore } from '../store';
import { Test } from '../../containers/Test';
import { useSearchCount } from './search-count';

const getStore = () => renderHook(() => {
  createStore();
  const [getter, setter] = useSearchCount();
  return { getter, setter };
}, {
  wrapper: Test,
});

it('automatically registers to the store', () => {
  const { result } = getStore();
  expect(result.current.getter).toEqual(0);
});

it('can update the stored values', () => {
  const { result } = getStore();
  act(() => result.current.setter(5));
  expect(result.current.getter).toEqual(5);
});
