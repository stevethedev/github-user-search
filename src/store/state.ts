import type { Action } from 'redux';
import type { ReadonlyDeep } from 'type-fest';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type State = Record<string, unknown>;

export type Reducer<T extends State = State> = (state: ReadonlyDeep<T>, action: Action) => T;
export type StateExtender<T extends State> = (state: ReadonlyDeep<Partial<T>>) => T;

const reducers: Reducer[] = [];
const stateExtenders: StateExtender<State>[] = [];

/**
 * Generates the initial state when the store is built.
 */
const initState = (): State => stateExtenders.reduce<State>((acc, extender) => extender(acc), {});

/**
 * Executes the registered reducers when the store is updated.
 * @param state The state to set when the reducer is run.
 * @param action The action being run against the state.
 */
export const reducer = (state = initState(), action: Action): State => (
  reducers.reduce((acc, r) => r(acc, action), state)
);

/**
 * Registers a reducer with the store's state. This inverts the dependencies so the core
 * state doesn't need to know anything about the other modules.
 *
 * @param r The reducer to add to the store.
 */
export const addReducer = <T extends State = State>(r: Reducer<T>): void => {
  // @ts-expect-error This happens because State is an empty object.
  reducers.push(r);
};

/**
 * Registers a handler that runs when the state is first created to set default values.
 * This inverts the dependencies so the store can be dynamically extended at compile-time.
 * @param extender The function to execute when the state is created.
 */
export const addState = <T extends State>(extender: StateExtender<T>): void => {
  // @ts-expect-error This happens because State is an empty object.
  stateExtenders.push(extender);
};

/**
 * Determines whether the given action is the expected type.
 * @param a The action to check.
 * @param type The expected value of the type-property.
 */
export const isAction = <T extends Action>(a: Action, type: T['type']): a is T => a.type === type;

/**
 * Ensures that the given action is the expected type by providing compile-time checking.
 * @param a The action to check.
 */
export const action = <T extends Action>(a: T): T => a;

export type StateAccessors<
  T,
  S extends (t: ReadonlyDeep<T>) => void = ((t: ReadonlyDeep<T>) => void)
  > = [ReadonlyDeep<T>, S];
