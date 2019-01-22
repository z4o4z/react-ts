import { ThunkAction } from 'redux-thunk';

import { Id, HashMap } from '../../types';
import { normalizeArrayOfObjectsByKey } from '../../utils/arrays';

import data from './mock';

export const BOARD_LOAD = 'BOARD_LOAD';
export const BOARD_LOADED_SUCCESS = 'BOARD_LOADED_SUCCESS';

export type BOARD_LOAD = typeof BOARD_LOAD;
export type BOARD_LOADED_SUCCESS = typeof BOARD_LOADED_SUCCESS;

export type BoardItem = {
  id: Id;
  tags: string[];
  name: string;
  position: number;
};

export type BoardList = {
  id: Id;
  name: string;
  items: Id[];
  position: number;
};

export type BoardState = {
  id: Id | null;
  name: string | null;
  items: HashMap<BoardItem>;
  lists: HashMap<BoardList>;
  listsIds: Id[];
};

export type BoardListRaw = {
  id: Id;
  name: string;
  items: BoardItem[];
  position: number;
};

export type BoardRaw = {
  id: Id;
  name: string;
  lists: BoardListRaw[];
};

export interface BoardLoadSuccess {
  type: BOARD_LOADED_SUCCESS;
  payload: BoardRaw;
}

export const boardLoad = (): ThunkAction<void, BoardState, void, BoardLoadSuccess> => dispatch => {
  setTimeout(() => dispatch(boardLoadedSuccess(data)));
};

export const boardLoadedSuccess = (payload: BoardRaw): BoardLoadSuccess => ({
  type: BOARD_LOADED_SUCCESS,
  payload,
});

const initialState = {
  id: null,
  name: null,
  items: {},
  lists: {},
  listsIds: [],
};

export default function board(
  state: BoardState = initialState,
  { type, payload }: BoardLoadSuccess
): BoardState {
  switch (type) {
    case BOARD_LOADED_SUCCESS: {
      const [listsIds, rawLists] = normalizeArrayOfObjectsByKey<BoardListRaw, 'id'>(
        payload.lists,
        'id'
      );
      const items: HashMap<BoardItem> = {};
      const lists: HashMap<BoardList> = {};

      listsIds.forEach(key => {
        const list = rawLists[key];
        const [itemsIds, listItems] = normalizeArrayOfObjectsByKey<BoardItem, 'id'>(
          list.items,
          'id'
        );

        lists[key] = {
          ...list,
          items: itemsIds,
        };

        Object.assign(items, listItems);
      });

      return { ...state, lists, items, listsIds };
    }
    default:
      return state;
  }
}
