import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../redux';

type IInfoSideBarState = {
  infoSidebar: boolean;
};

const initialState: IInfoSideBarState = {
  infoSidebar: true,
};

export const INFORSIDE_BAR_REDUCER = 'infoSidebar';

export const infoSidebarSlice = createSlice({
  name: INFORSIDE_BAR_REDUCER,
  initialState,
  reducers: {
    setInfoSidebar(state, action) {
      state.infoSidebar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInfoSidebar } = infoSidebarSlice.actions;

export const infoSidebarReducer = infoSidebarSlice.reducer;
export const selectInfoSidebar = (state: RootState) => state.infoSidebar.infoSidebar;
