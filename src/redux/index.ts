import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import * as board from './board';

type StoreState = {
  board: board.BoardState;
};

type StoreActions = board.BoardLoadSuccess;

const rootReducer = combineReducers({ board: board.default });

export default () =>
  createStore<StoreState, StoreActions, void, void>(rootReducer, applyMiddleware(thunk));
