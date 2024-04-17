import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrderReportKey } from '@/stores/OrderRadiology';
import { RootState } from '@/stores/redux';
import { Nullable } from '@/types';

export const PATIENT_HISTORY = 'patientHistory';

export enum PATIENT_HISTORY_NODE {
  DIAGNOSIS = 'DIAGNOSIS',
  TEST_RESULT = 'TEST_RESULT',
  CLINICAL = 'CLINICAL',
}
type PatientHistorySlice = IOrderReportKey & { sidebarKey: `${PATIENT_HISTORY_NODE}` };

const initialState: Nullable<PatientHistorySlice> = {
  orderID: null,
  requestID: null,
  sidebarKey: PATIENT_HISTORY_NODE.DIAGNOSIS,
};
export const patientHistorySlice = createSlice({
  name: PATIENT_HISTORY,
  initialState,
  reducers: {
    setPatientHistoryKey(state, action: PayloadAction<Nullable<IOrderReportKey>>) {
      state.orderID = action.payload.orderID;
      state.requestID = action.payload.requestID;
    },
    setSidebarKey(state, action: PayloadAction<Pick<PatientHistorySlice, 'sidebarKey'>>) {
      state.sidebarKey = action.payload.sidebarKey;
    },
  },
});

export const { setPatientHistoryKey, setSidebarKey } = patientHistorySlice.actions;
export const patientHistoryReducer = patientHistorySlice.reducer;

export const selectPatientHistoryKey = (state: RootState) => state.patientHistory;
export const selectSidebarKey = (state: RootState) => state.patientHistory.sidebarKey;
