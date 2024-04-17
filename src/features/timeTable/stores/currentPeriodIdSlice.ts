import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';

export const CURRENT_PERIOD_ID_REDUCER = 'currentPeriodIdReducer';

type CurrentPeriodIdState = {
  currentPeriodId: number;
};

const initialState: CurrentPeriodIdState = { currentPeriodId: 0 };

export const CurrentPeriodIdSlice = createSlice({
  name: CURRENT_PERIOD_ID_REDUCER,
  initialState,
  reducers: {
    setCurrentPeriodID(state, action) {
      state.currentPeriodId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentPeriodID } = CurrentPeriodIdSlice.actions;
export const currentPeriodIdReducer = CurrentPeriodIdSlice.reducer;
export const getCurrentPeriodID = (state: RootState) => state.currentPeriodIdReducer;
