import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';

export const AUTO_SELECT_REDUCER = 'autoSelect';

export const autoSelectSlice = createSlice({
  name: AUTO_SELECT_REDUCER,
  initialState: true,
  reducers: {
    setAutoSelectModality(state) {
      return !state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAutoSelectModality } = autoSelectSlice.actions;
export const autoSelectReducer = autoSelectSlice.reducer;
export const getisAutoSelectModalityed = (state: RootState) => state.autoSelect;
