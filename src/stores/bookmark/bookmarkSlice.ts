import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';
import { BaseEntity } from '@/types';

export const BOOKMARK_REDUCER = 'bookmark';
type Bookmark = {
  folderID?: BaseEntity['id'];
};
export const DEFAULT_BOOKMARK = {};
const initialState: Bookmark = DEFAULT_BOOKMARK;
export const bookmarkSlice = createSlice({
  name: BOOKMARK_REDUCER,
  initialState,
  reducers: {
    setBookmarkFolderID(state, action: PayloadAction<{ folderID: BaseEntity['id'] }>) {
      state.folderID = action.payload.folderID;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBookmarkFolderID } = bookmarkSlice.actions;
export const bookmarkReducer = bookmarkSlice.reducer;
export const selectBookmarkFolderIdData = (state: RootState) => state.bookmark.folderID;
