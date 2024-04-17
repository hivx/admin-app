import { createSlice } from '@reduxjs/toolkit';

import { IQmsModalityDTO } from '@/features/qms';
import { RootState } from '@/stores/redux';

export const QMS_SELECT_MODALITY = 'selectModality';

type ContextMenuStoreState = {
  selectModality: Partial<IQmsModalityDTO>;
};

const initialState: ContextMenuStoreState = {
  selectModality: {},
};

export const selectModalitySlice = createSlice({
  name: QMS_SELECT_MODALITY,
  initialState,
  reducers: {
    setSelectModality(state, action) {
      state.selectModality = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectModality } = selectModalitySlice.actions;
export const selectModalityReducer = selectModalitySlice.reducer;
export const getSelectedModality = (state: RootState) => state.selectModality;
