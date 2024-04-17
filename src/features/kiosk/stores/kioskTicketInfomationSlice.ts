import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';

import { ITicketCreateDTO } from '../types/ticket';

export const KIOSK_TICKET_INFOMATION_REDUCER = 'kioskTicketInfomation';

type kioskTicketInfomationState = {
  kioskTicketInfomation: ITicketCreateDTO;
};

const initialState: kioskTicketInfomationState = { kioskTicketInfomation: {} };
export const kioskTicketInfomationSlice = createSlice({
  name: KIOSK_TICKET_INFOMATION_REDUCER,
  initialState,
  reducers: {
    setKioskTicketInfomation(state, action) {
      state.kioskTicketInfomation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setKioskTicketInfomation } = kioskTicketInfomationSlice.actions;
export const kioskTicketInfomationReducer = kioskTicketInfomationSlice.reducer;
export const getKioskTicketInfomation = (state: RootState) => state.kioskTicketInfomation;
