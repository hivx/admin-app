import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';
import { BaseEntity } from '@/types';

export const ORDER_PANEL_REDUCER = 'orderPanel';

type OrderPanel = {
  orderID?: BaseEntity['id'];
  isOrderPanelOpen: boolean;
};

const initialState: OrderPanel = {
  orderID: undefined,
  isOrderPanelOpen: true,
};
export const orderPanelSlice = createSlice({
  name: ORDER_PANEL_REDUCER,
  initialState,
  reducers: {
    setPanelOrderID(state, action) {
      state.orderID = action.payload;
    },
    toggleIsOrderPanelOpen(state) {
      state.isOrderPanelOpen = !state.isOrderPanelOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPanelOrderID, toggleIsOrderPanelOpen } = orderPanelSlice.actions;
export const orderPanelReducer = orderPanelSlice.reducer;
export const getPanelOrderID = (state: RootState) => state.orderPanel.orderID;
export const selectIsOrderPanelOpen = (state: RootState) =>
  state.orderPanel.isOrderPanelOpen;
