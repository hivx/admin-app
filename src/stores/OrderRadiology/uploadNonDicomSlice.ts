import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Crop } from 'react-image-crop';

import { RootState } from '@/stores/redux';

export const UPLOAD_NON_DICOM = 'uploadNonDicom';

type UploadNonDicom = {
  autoSaveNonDicom: boolean;
  createNewSeries: boolean;
  cropSize: Crop;
  videoConstraints: {
    width: number;
    height: number;
  };
  screenID: number;
  customScreen?: boolean;
};

const initialState: UploadNonDicom = {
  autoSaveNonDicom: false,
  createNewSeries: false,
  cropSize: {
    x: 0,
    y: 0,
    width: 320,
    height: 240,
    unit: 'px',
  },
  videoConstraints: {
    width: 1920,
    height: 720,
  },
  customScreen: false,
  screenID: -1,
};
export const uploadNonDicomSlice = createSlice({
  name: UPLOAD_NON_DICOM,
  initialState,
  reducers: {
    toggleAutoSaveNonDicom(state) {
      state.autoSaveNonDicom = !state.autoSaveNonDicom;
    },
    toggleCreateNewSeries(state) {
      state.createNewSeries = !state.createNewSeries;
    },
    setCropSize(state, action) {
      state.cropSize = action.payload;
    },
    setVideoConstraints(
      state,
      action: PayloadAction<Pick<UploadNonDicom, 'videoConstraints'>>,
    ) {
      state.videoConstraints = action.payload.videoConstraints;
    },
    setScreenID(state, action: PayloadAction<Pick<UploadNonDicom, 'screenID'>>) {
      state.screenID = action.payload.screenID;
    },
    toggleCustomScreen(
      state,
      action: PayloadAction<Pick<UploadNonDicom, 'customScreen'>>,
    ) {
      state.customScreen = action.payload.customScreen;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleAutoSaveNonDicom,
  toggleCreateNewSeries,
  setCropSize,
  setVideoConstraints,
  toggleCustomScreen,
  setScreenID,
} = uploadNonDicomSlice.actions;
export const uploadNonDicomReducer = uploadNonDicomSlice.reducer;
export const selectToggleAutoSaveNonDicom = (state: RootState) =>
  state.uploadNonDicom.autoSaveNonDicom;
export const selectToggleCreateNewSeries = (state: RootState) =>
  state.uploadNonDicom.createNewSeries;
export const getCropSize = (state: RootState) => state.uploadNonDicom.cropSize;
export const getVideoConstraints = (state: RootState) =>
  state.uploadNonDicom.videoConstraints;
export const getScreenID = (state: RootState) => state.uploadNonDicom.screenID;
export const selectToggleCustomScreen = (state: RootState) =>
  state.uploadNonDicom.customScreen;
