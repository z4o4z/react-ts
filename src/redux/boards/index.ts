import { Id, HashMap, MyThunkAction } from '../../types';
import { normalizeArrayOfObjectsByKey } from '../../utils/arrays';

import data from './mock';

export const BOARDS_LOAD = 'BOARDS_LOAD';
export const BOARDS_LOAD_START = 'BOARDS_LOAD_START';
export const BOARDS_LOADED_SUCCESS = 'BOARDS_LOADED_SUCCESS';

export type BOARDS_LOAD = typeof BOARDS_LOAD;
export type BOARDS_LOAD_START = typeof BOARDS_LOAD_START;
export type BOARDS_LOADED_SUCCESS = typeof BOARDS_LOADED_SUCCESS;

export type Board = {
  id: Id;
  name: string;
  position: number;
};

export type BoardsState = {
  ids: Id[];
  items: HashMap<Board>;
  loading: Boolean;
};

export interface BoardsLoadStart {
  type: BOARDS_LOAD_START;
}

export interface BoardsLoadSuccess {
  type: BOARDS_LOADED_SUCCESS;
  data: Board[];
}

export type BoardsActions = BoardsLoadStart | BoardsLoadSuccess;

export const boardsLoad = (): MyThunkAction<BoardsActions> => dispatch => {
  dispatch(boardsLoadStart());
  setTimeout(() => dispatch(boardsLoadedSuccess(data)), Math.random() * 1000);
};

export const boardsLoadStart = (): BoardsLoadStart => ({ type: BOARDS_LOAD_START });

export const boardsLoadedSuccess = (data: Board[]): BoardsLoadSuccess => ({
  type: BOARDS_LOADED_SUCCESS,
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
    case BOARDS_LOAD_START: {
      return { ...state, loading: true };
    }
    case BOARDS_LOADED_SUCCESS: {
      const [ids, items] = normalizeArrayOfObjectsByKey<Board, 'id'>(action.data, 'id');

      return { ...state, ids, items, loading: false };
    }
    default:
      return state;
  }
}
