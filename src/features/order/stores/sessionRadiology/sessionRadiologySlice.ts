import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';

import { SessionConfigFormField } from '../../components/RadiologyReport/Modal/DefaultInfoRadiologyModal/DefaultInfoRadiolgyForm';

export const SESSION_RADIOLOGY_CONFIG = 'sessionRadiologyConfig';

const initialState: SessionConfigFormField = {
  isAutoFillRadiologyContent: true,
  isFilterContentByCurrentUser: false,
};
export const sessionRadiologySlice = createSlice({
  name: SESSION_RADIOLOGY_CONFIG,
  initialState,
  reducers: {
    setSessionConfig(state, action: PayloadAction<SessionConfigFormField>) {
      state.modalityID = action.payload.modalityID;
      state.operators = action.payload.operators;
      state.reporterID = action.payload.reporterID;
      state.isAutoFillRadiologyContent = action.payload.isAutoFillRadiologyContent;
      state.isFilterContentByCurrentUser = action.payload.isFilterContentByCurrentUser;
    },
  },
});

export const { setSessionConfig } = sessionRadiologySlice.actions;
export const sessionRadiologyReducer = sessionRadiologySlice.reducer;

export const selectSessionRadiologyConfig = (state: RootState) =>
  state.sessionRadiologyConfig;
