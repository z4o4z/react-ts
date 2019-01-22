import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as board from './board';

// type StoreState = {
//   board: board.BoardState;
// };

// type StoreActions = board.BoardLoadSuccess;

const rootReducer = combineReducers({ board: board.default });

export default () => createStore(rootReducer, applyMiddleware(thunk));
