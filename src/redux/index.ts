import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { BoardsState, BoardsActions, ActiveBoardState, ActiveBoardActions } from './types';

import boards from './boards';
import activeBoard from './activeBoard';

export type StoreState = {
  boards: BoardsState;
  activeBoard: ActiveBoardState;
};

export type StoreActions = BoardsActions | ActiveBoardActions;

const rootReducer = combineReducers<StoreState, StoreActions>({ boards, activeBoard });

export default () => createStore(rootReducer, applyMiddleware(thunk));
