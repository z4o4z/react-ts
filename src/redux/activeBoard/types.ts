import { Id, HashMap } from '../../types';

export enum ActiveBoardActionsTypes {
  ACTIVE_BOARD_LOAD = 'ACTIVE_BOARD_LOAD',
  ACTIVE_BOARD_LOADED_SUCCESS = 'ACTIVE_BOARD_LOADED_SUCCESS',
}

export type ActiveBoardItem = {
  id: Id;
  tags: string[];
  name: string;
  position: number;
};

export type ActiveBoardList = {
  id: Id;
  name: string;
  items: Id[];
  position: number;
};

export type ActiveBoardState = {
  id: Id | null;
  name: string | null;
  items: HashMap<ActiveBoardItem>;
  lists: HashMap<ActiveBoardList>;
  listsIds: Id[];
};

export type ActiveBoardListRaw = {
  id: Id;
  name: string;
  items: ActiveBoardItem[];
  position: number;
};

export type ActiveBoardRaw = {
  id: Id;
  name: string;
  lists: ActiveBoardListRaw[];
};

export interface ActiveBoardLoadSuccess {
  type: ActiveBoardActionsTypes.ACTIVE_BOARD_LOADED_SUCCESS;
  payload: ActiveBoardRaw;
}

export type ActiveBoardActions = ActiveBoardLoadSuccess;
