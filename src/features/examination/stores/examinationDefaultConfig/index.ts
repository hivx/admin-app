import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';
import { BaseEntity } from '@/types';
import { IUserDTO } from '@/types/dto';

export const EXAMINATION_DEFAULT_CONFIG = 'examinationDefaultConfig';

export type ExaminationConfigKey = string;

export type ExaminationConfigContext = {
  modalityID?: BaseEntity['id'];
  operators?: IUserDTO[];
  reporterID?: BaseEntity['id'];
  approverID?: BaseEntity['id'];
  expectedReporter?: IUserDTO;
  approver?: IUserDTO;
};

type ExaminationConfigContextState = Record<
  ExaminationConfigKey,
  ExaminationConfigContext
>;

export type PayloadUpdateExaminationDefaultConfig = {
  examinationConfigKey: ExaminationConfigKey;
  meta: ExaminationConfigContext;
};

const initialState: ExaminationConfigContextState = {};
export const examinationDefaultConfigSlice = createSlice({
  name: EXAMINATION_DEFAULT_CONFIG,
  initialState,
  reducers: {
    updateExaminationDefaultConfig(
      state,
      action: PayloadAction<PayloadUpdateExaminationDefaultConfig>,
    ) {
      const key = action.payload.examinationConfigKey;
      if (key !== '') {
        state[key] = action.payload.meta;
      }
    },
  },
});

export const { updateExaminationDefaultConfig } = examinationDefaultConfigSlice.actions;
export const examinationDefaultConfigReducer = examinationDefaultConfigSlice.reducer;

export const selectExaminationDefaultConfig = (state: RootState) =>
  state.examinationDefaultConfig;
export const selectDefaultConfigByModalityType =
  (modalityType?: ExaminationConfigKey) => (state: RootState) =>
    modalityType ? state.examinationDefaultConfig[modalityType] : undefined;
