/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react-hooks';
import type { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { createStore } from './store';
import { addReducer, addState, isAction } from './state';
import { Test } from '../containers/Test';

interface TestAction extends Action<'TEST'> {
  foo: string;
}

addReducer((state, a) => {
  if (isAction<TestAction>(a, 'TEST')) {
    return { ...state, foo: a.foo };
  }
  return state;
});

addState((state) => ({ ...state, foo: 'bar' }));

const getStore = () => renderHook(() => {
  createStore();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  return { dispatch, selector };
}, {
  wrapper: Test,
});

it('automatically registers state modifications', () => {
  const { result } = getStore();
  expect(result.current.selector).toEqual({ foo: 'bar' });
});

it('automatically registers reducers', () => {
  const { result } = getStore();
  act(() => void result.current.dispatch({ type: 'TEST', foo: 'different value' }));
  expect(result.current.selector).toEqual({ foo: 'different value' });
});
