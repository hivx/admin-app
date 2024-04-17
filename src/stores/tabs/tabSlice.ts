/**
 * Handle tabs definition and tabs list
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';
import { ITabItem } from '@/types';

type TabStoreState = {
  tabsList: ITabItem[];
};
/**
 * Max
 */
const MAX_TABS = 4;
/**
 * Justification for using Object instead of array
 * Since we will most likely be using keys to access tab data
 * - Array cost:
 *    - Add: O(1)
 *    - Access by key: O(n)
 *    - Delete by key: O(n)
 * - Object cost:
 *    - Add: O(1)
 *    - Access by key: O(1)
 *    - Delete by key: O(1)
 */
const initialState: TabStoreState = {
  tabsList: [],
};

export const TAB_REDUCER = 'tabs';

export const tabSlice = createSlice({
  name: TAB_REDUCER,
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<ITabItem>) => {
      const { id } = action.payload;
      const closeable = action.payload.closeable ?? true;
      /**
       * If tab list lenght more than 10 item we will remove fisrt item in tab list
       */
      if (state.tabsList.length > MAX_TABS) {
        state.tabsList.shift();
      }

      /**
       * Check id exists or not in tab list
       * @return boolean
       */
      const alreadyExistTab = state.tabsList.some((tab) => tab.id === id);

      /**
       * If id doesn't exist in tab list will push obj into tab list
       */
      if (!alreadyExistTab) {
        state.tabsList = [...state.tabsList, { ...action.payload, closeable }];
      }
    },
    deleteTab: (state, action: PayloadAction<ITabItem['id']>) => {
      const id = action.payload;
      /**
       * Filter new array doesn't id delete
       */
      state.tabsList = state.tabsList.filter((tab) => tab.id !== id);
    },
    deleteOtherTab: (state, action: PayloadAction<ITabItem['id']>) => {
      const id = action.payload;
      const currentTab = state.tabsList.find((tab) => tab.id === id);
      if (currentTab) {
        state.tabsList = [currentTab];
      }
    },
    deleteAllTab: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTab, deleteTab, deleteAllTab, deleteOtherTab } = tabSlice.actions;

export const tabReducer = tabSlice.reducer;

// For simple reducer, we can include getters here
// New naming convention: https://redux.js.org/style-guide/#name-selector-functions-as-selectthing
export const selectTabList = (state: RootState) => state.tabs.tabsList;

export const selectTabItem = (tabId: ITabItem['id']) => (state: RootState) =>
  state.tabs.tabsList.find((tab) => tab.id === tabId);
