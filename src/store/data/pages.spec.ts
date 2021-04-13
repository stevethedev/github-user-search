/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react-hooks';
import { createStore } from '../store';
import { Test } from '../../containers/Test';
import { Page, usePage } from './pages';

const getStore = () => renderHook(() => {
  createStore();
  const [page, setPage] = usePage();
  return { page, setPage };
}, {
  wrapper: Test,
});

it('automatically registers to the store', () => {
  const { result } = getStore();
  expect(result.current.page).toEqual(Page.Search);
});

it('can update the page values', () => {
  const { result } = getStore();
  act(() => result.current.setPage(Page.User));
  expect(result.current.page).toEqual(Page.User);
});
