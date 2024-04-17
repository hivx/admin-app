/**
 * Handle storage of Layout related CONSTANTS
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';

type LayoutStoreState = {
  collapsiblePanelHeight: number;
  dynamicSidepanelWidth: number;
};

const initialState: LayoutStoreState = {
  collapsiblePanelHeight: 300,
  dynamicSidepanelWidth: 500,
};

export const LAYOUT_REDUCER = 'layoutConstants';

export const layoutSlice = createSlice({
  name: LAYOUT_REDUCER,
  initialState,
  reducers: {
    setCollapsiblePanelHeight: (state, action: PayloadAction<number>) => {
      const MIN_HEIGHT = 100;
      state.collapsiblePanelHeight =
        action.payload < MIN_HEIGHT ? MIN_HEIGHT : action.payload;
    },
    setDynamicSidepanelWidth: (state, action: PayloadAction<number>) => {
      const MIN_WIDTH = 400;
      const MAX_WIDTH = window.innerWidth * 0.5;
      state.dynamicSidepanelWidth = Math.min(
        MAX_WIDTH,
        Math.max(action.payload, MIN_WIDTH),
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCollapsiblePanelHeight, setDynamicSidepanelWidth } =
  layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;

// For simple reducer, we can include getters here
// New naming convention: https://redux.js.org/style-guide/#name-selector-functions-as-selectthing
export const selectCollapsiblePanelHeight = (state: RootState) =>
  state.layoutConstants.collapsiblePanelHeight;

export const selectDynamicSidepanelWidth = (state: RootState) =>
  state.layoutConstants.dynamicSidepanelWidth;
