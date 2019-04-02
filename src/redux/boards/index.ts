import { MyThunkAction } from '../../types';
import { normalizeArrayOfObjectsByKey, sortArrayOfIdsByPosition } from '../../utils/arrays';

import data from './mock';

import {
  Board,
  BoardsState,
  BoardsActions,
  BoardsLoadStart,
  BoardsLoadSuccess,
  BoardsActionsTypes,
} from './types';

export const boardsLoad = (): MyThunkAction<BoardsLoadStart | BoardsLoadSuccess> => dispatch => {
  dispatch(boardsLoadStart());
  setTimeout(() => dispatch(boardsLoadedSuccess(data)), Math.random() * 1000);
};

export const boardsLoadStart = (): BoardsLoadStart => ({
  type: BoardsActionsTypes.BOARDS_LOAD_START,
});

export const boardsLoadedSuccess = (data: Board[]): BoardsLoadSuccess => ({
  type: BoardsActionsTypes.BOARDS_LOADED_SUCCESS,
  data,
});

const initialState = {
  ids: [],
  items: {},
  loading: true,
};

export default function board(
  state: BoardsState = initialState,
  action: BoardsActions
): BoardsState {
  switch (action.type) {
    case BoardsActionsTypes.BOARDS_LOAD_START: {
      return { ...state, loading: true };
    }
    case BoardsActionsTypes.BOARDS_LOADED_SUCCESS: {
      const [ids, items] = normalizeArrayOfObjectsByKey<Board, 'id'>(action.data, 'id');

      return { ...state, ids: sortArrayOfIdsByPosition(ids, items), items, loading: false };
    }
    default:
      return state;
  }
}
