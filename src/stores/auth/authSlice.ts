import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { KEYS_CONFIG } from '@/stores/localStorage';
import { IJwtToken, IUserDTO } from '@/types/dto';

import { AuthState } from '../../features/auth/types';

const initialState: AuthState = {
  user: null,
  token: {
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    expiresAt: null,
    type: null,
    issuedAt: null,
  },
};

export const AUTH_REDUCER = 'auth';

export const ACTION_CLEAR_CREDENTIALS = 'clearCredentials';

export const authSlice = createSlice({
  name: AUTH_REDUCER,
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<IUserDTO>) => {
      state.user = payload;
    },
    setToken: (state, { payload }: PayloadAction<IJwtToken>) => {
      state.token = payload;
    },
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: IUserDTO; token: IJwtToken }>,
    ) => {
      state.user = user;
      state.token = token;
    },
    [ACTION_CLEAR_CREDENTIALS]: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const myAuthMiddleware = createListenerMiddleware();

/**
 * Intercept set refreshToken actions and immediately store it in LocalStorage
 * because other tabs need up to date refreshToken
 */
myAuthMiddleware.startListening({
  actionCreator: authSlice.actions.setToken,
  effect: (action) => {
    action.payload.refreshToken &&
      localStorage.setItem(KEYS_CONFIG.REFRESH_TOKEN, action.payload.refreshToken);
  },
});

myAuthMiddleware.startListening({
  actionCreator: authSlice.actions.setCredentials,
  effect: (action) => {
    action.payload.token.refreshToken &&
      localStorage.setItem(KEYS_CONFIG.REFRESH_TOKEN, action.payload.token.refreshToken);
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, setToken, clearCredentials, setCredentials } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
