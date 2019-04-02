import { Id, HashMap } from '../../types';

export enum BoardsActionsTypes {
  BOARDS_LOAD_START = 'BOARDS_LOAD_START',
  BOARDS_LOADED_SUCCESS = 'BOARDS_LOADED_SUCCESS',
}

export type Board = {
  id: Id;
  name: string;
  image: string;
  position: number;
};

export type BoardsState = {
  ids: Id[];
  items: HashMap<Board>;
  loading: Boolean;
};

export interface BoardsLoadStart {
  type: BoardsActionsTypes.BOARDS_LOAD_START;
}

export interface BoardsLoadSuccess {
  type: BoardsActionsTypes.BOARDS_LOADED_SUCCESS;
  data: Board[];
}

export type BoardsActions = BoardsLoadStart | BoardsLoadSuccess;
