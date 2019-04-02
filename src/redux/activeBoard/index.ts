import { HashMap, MyThunkAction } from '../../types';
import { normalizeArrayOfObjectsByKey, sortArrayOfIdsByPosition } from '../../utils/arrays';

import data from './mock';

import {
  ActiveBoardRaw,
  ActiveBoardItem,
  ActiveBoardList,
  ActiveBoardState,
  ActiveBoardListRaw,
  ActiveBoardLoadSuccess,
  ActiveBoardActionsTypes,
} from './types';

export const activeBoardLoad = (): MyThunkAction<ActiveBoardLoadSuccess> => dispatch => {
  setTimeout(() => dispatch(activeBoardLoadedSuccess(data)));
};

export const activeBoardLoadedSuccess = (payload: ActiveBoardRaw): ActiveBoardLoadSuccess => ({
  type: ActiveBoardActionsTypes.ACTIVE_BOARD_LOADED_SUCCESS,
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
  console.log(type, ActiveBoardActionsTypes);
  switch (type) {
    case ActiveBoardActionsTypes.ACTIVE_BOARD_LOADED_SUCCESS: {
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
          items: sortArrayOfIdsByPosition(itemsIds, listItems),
        };

        Object.assign(items, listItems);
      });

      return { ...state, lists, items, listsIds: sortArrayOfIdsByPosition(listsIds, rawLists) };
    }
    default:
      return state;
  }
}
