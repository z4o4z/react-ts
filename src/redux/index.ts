import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import boards, { BoardsState, BoardsActions } from './boards';
import activeBoard, { ActiveBoardState, ActiveBoardActions } from './activeBoard';

export type StoreState = {
  boards: BoardsState;
  activeBoard: ActiveBoardState;
};

export type StoreActions = BoardsActions | ActiveBoardActions;

const rootReducer = combineReducers<StoreState, StoreActions>({ boards, activeBoard });

export default () => createStore(rootReducer, applyMiddleware(thunk));
