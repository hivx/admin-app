import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line no-restricted-imports
import { RootState } from '@/stores/redux';
import { ANALYTIC_ID } from '@/types/dto/analytics';

export const STATISTICAL_REPORT_REDUCER = 'statisticalReport';

export const statisticalReportSlice = createSlice({
  name: STATISTICAL_REPORT_REDUCER,
  initialState: ANALYTIC_ID.APPROVER_COUNT,
  reducers: {
    setTypePdf(_, action: PayloadAction<ANALYTIC_ID>) {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTypePdf } = statisticalReportSlice.actions;
export const statisticalReportReducer = statisticalReportSlice.reducer;
export const selectTypePdf = (state: RootState) => state.statisticalReport;
