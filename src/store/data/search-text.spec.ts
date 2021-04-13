/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react-hooks';
import { createStore } from '../store';
import { Test } from '../../containers/Test';
import { useSearchText } from './search-text';

const getStore = () => renderHook(() => {
  createStore();
  const [getter, setter] = useSearchText();
  return { getter, setter };
}, {
  wrapper: Test,
});

it('automatically registers to the store', () => {
  const { result } = getStore();
  expect(result.current.getter).toBeNull();
});

it('can update the stored values', () => {
  const { result } = getStore();
  act(() => result.current.setter('test'));
  expect(result.current.getter).toEqual('test');
  act(() => result.current.setter(null));
  expect(result.current.getter).toBeNull();
});
