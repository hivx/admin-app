import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';

export const MENU_EXPANDED_REDUCER = 'menuExpanded';

export const menuSlice = createSlice({
  name: MENU_EXPANDED_REDUCER,
  initialState: [] as string[],
  reducers: {
    setItemAdminMenuExpanded(_, action: PayloadAction<string[]>) {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItemAdminMenuExpanded } = menuSlice.actions;
export const menuExpandedReducer = menuSlice.reducer;
export const getItemMenuExpanded = (state: RootState) => state.menuExpanded;
