import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { StoreState, StoreActions } from './redux';

export type Id = string;

export type HashMap<T> = { [id: string]: T };

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export type ReduxState = StoreState;

export type MyThunkAction<A extends Action> = ThunkAction<void, StoreState, void, A>;

export type MyThunkDispatch = ThunkDispatch<StoreState, void, StoreActions>;
