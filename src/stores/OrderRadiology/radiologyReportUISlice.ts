/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Handle storage of Radiology Report metadata
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';
import { BaseEntity, BUTTON_STATE } from '@/types';
import {
  IRadiologyReportButtonsState,
  IRadiologyReportUIState,
  RadiologyReportActions,
  TAB_PAGES,
} from '@/types/radiology/reportContext';

export const DEFAULT_BUTTONS_STATE: IRadiologyReportButtonsState = {
  VIEW_IMAGE: BUTTON_STATE.DISABLED,
  TAKE_PICTURE: BUTTON_STATE.DISABLED,
  UNLOCK: BUTTON_STATE.DISABLED,
  LOCK: BUTTON_STATE.DISABLED,
  APPROVE: BUTTON_STATE.DISABLED,
  APPROVE_WITH_TIME: BUTTON_STATE.DISABLED,
  SAVE_DRAFT: BUTTON_STATE.DISABLED,
  PRINT: BUTTON_STATE.DISABLED,
  ATTACHMENT: BUTTON_STATE.DISABLED,
  SWAP_ROOM: BUTTON_STATE.DISABLED,
  CONTENT_TEMPLATE_BUTTON: BUTTON_STATE.DISABLED,
  CONTENT_TEMPLATE_SELECT: BUTTON_STATE.DISABLED,
  DELETE_LOCK: BUTTON_STATE.DISABLED,
};

type Key = BaseEntity['id'];

type ReportUIState = IRadiologyReportUIState & {
  lastUpdated: number;
};

type ReportUIStoreState = Record<Key, ReportUIState>;

const initialState: ReportUIStoreState = {} satisfies ReportUIStoreState;

export const RADIOLOGY_REPORT_UI_REDUCER = 'radiologyReportUIContext';

type SetButtonStateActionPayload = {
  button: RadiologyReportActions | `${RadiologyReportActions}`;
  state: BUTTON_STATE;
};
export const radiologyButtonsSlice = createSlice({
  name: RADIOLOGY_REPORT_UI_REDUCER,
  initialState,
  reducers: {
    setAllRadiologyReportButtonState: (
      state,
      action: PayloadAction<
        | {
            orderID: Key;
            buttonState: Partial<IRadiologyReportButtonsState>;
            merge: true;
          }
        | {
            orderID: Key;
            buttonState: IRadiologyReportButtonsState;
            merge: false | undefined;
          }
      >,
    ) => {
      const { orderID, buttonState, merge } = action.payload;
      if (!state[orderID]) state[orderID] = initializeState(state);
      if (merge) {
        state[orderID].buttons = {
          ...state[orderID].buttons,
          ...buttonState,
        };
      } else {
        state[orderID].buttons = buttonState;
      }
      state[orderID].lastUpdated = new Date().getTime();
    },
    setRadiologyReportButtonState: (
      state,
      action: PayloadAction<{ orderID: Key } & SetButtonStateActionPayload>,
    ) => {
      const { button, state: buttonState, orderID } = action.payload;
      if (!state[orderID])
        state[orderID] = initializeState(state, { [button]: buttonState });
      else state[orderID].buttons[button] = buttonState;
    },
    setRadiologyReportButtonHidden: (
      state,
      action: PayloadAction<
        { orderID: Key } & Omit<SetButtonStateActionPayload, 'state'>
      >,
    ) => {
      const { orderID, button } = action.payload;
      if (!state[orderID])
        state[orderID] = initializeState(state, { [button]: BUTTON_STATE.HIDDEN });
      else state[orderID].buttons[button] = BUTTON_STATE.HIDDEN;
    },
    setRadiologyReportButtonActive: (
      state,
      action: PayloadAction<
        { orderID: Key } & Omit<SetButtonStateActionPayload, 'state'>
      >,
    ) => {
      const { orderID, button } = action.payload;
      if (!state[orderID])
        state[orderID] = initializeState(state, { [button]: BUTTON_STATE.ACTIVE });
      else state[orderID].buttons[button] = BUTTON_STATE.ACTIVE;
    },
    setRadiologyReportButtonDisabled: (
      state,
      action: PayloadAction<
        { orderID: Key } & Omit<SetButtonStateActionPayload, 'state'>
      >,
    ) => {
      const { orderID, button } = action.payload;
      if (!state[orderID]) state[orderID] = initializeState(state);
      state[orderID].buttons[button] = BUTTON_STATE.DISABLED;
    },
    /**
     * Flip between ACTIVE AND DISABLED
     */
    setToggleRadiologyReportButton: (
      state,
      action: PayloadAction<
        { orderID: Key } & Omit<SetButtonStateActionPayload, 'state'>
      >,
    ) => {
      const { orderID, button } = action.payload;
      if (!state[orderID])
        state[orderID] = initializeState(state, { [button]: BUTTON_STATE.ACTIVE });
      else if (state[orderID].buttons[button] === BUTTON_STATE.ACTIVE) {
        state[orderID].buttons[button] = BUTTON_STATE.DISABLED;
      } else if (state[orderID].buttons[button] === BUTTON_STATE.DISABLED) {
        state[orderID].buttons[button] = BUTTON_STATE.ACTIVE;
      }
    },
    setRadiologyReportIsEditable: (
      state,
      action: PayloadAction<{ orderID: Key } & { isEditable: boolean }>,
    ) => {
      const { orderID, isEditable } = action.payload;
      if (!state[orderID]) state[orderID] = initializeState(state, { isEditable });
      else {
        state[orderID].isEditable = isEditable;
      }
    },
    toggleRadiologyReportPersonalContentTemplateButtonState: (
      state,
      action: PayloadAction<{ orderID: Key }>,
    ) => {
      const { orderID } = action.payload;
      if (!state[orderID])
        state[orderID] = initializeState(state, {
          personalContentTemplateButtonState: false,
        });
      else {
        state[orderID].personalContentTemplateButtonState =
          !state[orderID].personalContentTemplateButtonState;
      }
    },
    setRadiologyTabKey: (
      state,
      action: PayloadAction<{ orderID: Key } & { tabKey: TAB_PAGES }>,
    ) => {
      const { orderID, tabKey } = action.payload;
      if (!state[orderID]) state[orderID] = initializeState(state, { tabKey });
      else {
        state[orderID].tabKey = tabKey;
      }
    },
    setRadiologyReportIsApproveButtonClicked: (
      state,
      action: PayloadAction<{ orderID: Key } & { isApproveButtonClicked: boolean }>,
    ) => {
      const { orderID, isApproveButtonClicked } = action.payload;
      if (!state[orderID])
        state[orderID] = initializeState(state, { isApproveButtonClicked });
      else {
        state[orderID].isApproveButtonClicked = isApproveButtonClicked;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setRadiologyReportButtonState,
  setRadiologyReportButtonHidden,
  setRadiologyReportButtonActive,
  setRadiologyReportButtonDisabled,
  setToggleRadiologyReportButton,
  setAllRadiologyReportButtonState,
  setRadiologyReportIsEditable,
  toggleRadiologyReportPersonalContentTemplateButtonState,
  setRadiologyTabKey,
  setRadiologyReportIsApproveButtonClicked,
} = radiologyButtonsSlice.actions;

export const radiologyButtonsReducer = radiologyButtonsSlice.reducer;

// For simple reducer, we can include getters here
// New naming convention: https://redux.js.org/style-guide/#name-selector-functions-as-selectthing
export const selectRadiologyReportButtonsState =
  (orderID: Key, button: RadiologyReportActions | `${RadiologyReportActions}`) =>
  (state: RootState) =>
    state.radiologyReportUIContext[orderID]?.buttons[button]
      ? state.radiologyReportUIContext[orderID].buttons[button]
      : undefined;

/**
 * UI Selector
 */
export const selectRadiologyReportIsEditable = (orderID: Key) => (state: RootState) =>
  state.radiologyReportUIContext[orderID]?.isEditable;

export const selectRadiologyReportPersonalContentTemplateButtonState =
  (orderID: Key) => (state: RootState) =>
    state.radiologyReportUIContext[orderID]?.personalContentTemplateButtonState;

export const selectRadiologyReportTabKey = (orderID: Key) => (state: RootState) =>
  state.radiologyReportUIContext[orderID]?.tabKey;

export const selectRadiologyReportIsApproveButtonClicked =
  (orderID: Key) => (state: RootState) =>
    state.radiologyReportUIContext[orderID]?.isApproveButtonClicked;

// utilities

const MAX_STORE = 10;
/**
 * Create initial state
 * Check and delete old state if exceed maximum number
 */
const initializeState = (
  state: ReportUIStoreState,
  override?: Partial<ReportUIState>,
): ReportUIState => {
  if (Object.keys(state).length > MAX_STORE) {
    const sortedByLastUpdated = Object.entries(state).sort(
      (a, b) => a[1].lastUpdated - b[1].lastUpdated,
    );

    const oldestReport = sortedByLastUpdated[0];

    delete state[parseInt(oldestReport[0])];
  }
  return {
    buttons: DEFAULT_BUTTONS_STATE,
    personalContentTemplateButtonState: false,
    isEditable: false,
    tabKey: TAB_PAGES.REPORT,
    lastUpdated: new Date().getTime(),
    isApproveButtonClicked: false,
    ...override,
  };
};
