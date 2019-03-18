import { ThunkAction } from 'redux-thunk';

import { Id, HashMap } from '../../types';
import { normalizeArrayOfObjectsByKey } from '../../utils/arrays';

import data from './mock';

export type ACTIVE_BOARD_LOAD = 'ACTIVE_BOARD_LOAD';
export const ACTIVE_BOARD_LOAD = 'ACTIVE_BOARD_LOAD';

export type ACTIVE_BOARD_LOADED_SUCCESS = 'ACTIVE_BOARD_LOADED_SUCCESS';
export const ACTIVE_BOARD_LOADED_SUCCESS = 'ACTIVE_BOARD_LOADED_SUCCESS';

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
  type: ACTIVE_BOARD_LOADED_SUCCESS;
  payload: ActiveBoardRaw;
}

export type ActiveBoardActions = ActiveBoardLoadSuccess;

export const activeBoardLoad = (): ThunkAction<
  void,
  ActiveBoardState,
  void,
  ActiveBoardLoadSuccess
> => dispatch => {
  setTimeout(() => dispatch(activeBoardLoadedSuccess(data)));
};

export const activeBoardLoadedSuccess = (payload: ActiveBoardRaw): ActiveBoardLoadSuccess => ({
  type: ACTIVE_BOARD_LOADED_SUCCESS,
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
  state: ActiveBoardState = initialState,
  { type, payload }: ActiveBoardLoadSuccess
): ActiveBoardState {
  switch (type) {
    case ACTIVE_BOARD_LOADED_SUCCESS: {
      const [listsIds, rawLists] = normalizeArrayOfObjectsByKey<ActiveBoardListRaw, 'id'>(
        payload.lists,
        'id'
      );
      const items: HashMap<ActiveBoardItem> = {};
      const lists: HashMap<ActiveBoardList> = {};

      listsIds.forEach(key => {
        const list = rawLists[key];
        const [itemsIds, listItems] = normalizeArrayOfObjectsByKey<ActiveBoardItem, 'id'>(
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
