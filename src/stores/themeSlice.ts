import { createSlice } from '@reduxjs/toolkit';

import { HOSPITAL_ID, MODE_THEME } from '@/config';
import { HOSPITAL_IDS } from '@/config/hospitalIDs';

import { RootState } from './redux';

type IThemeState = {
  themeMode: MODE_THEME;
};

const initialState: IThemeState = {
  themeMode:
    HOSPITAL_ID === HOSPITAL_IDS.VISNAM
      ? MODE_THEME.VIETRAD_THEME
      : MODE_THEME.ITECH_THEME,
};

export const THEME_REDUCER = 'theme';

export const themeSlice = createSlice({
  name: THEME_REDUCER,
  initialState,
  reducers: {
    setTheme(state, action) {
      state.themeMode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
export const selectTheme = (state: RootState) => state.theme.themeMode;
