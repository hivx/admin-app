import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';

import { ITicketCreateDTO } from '../types/ticket';

export const QMS_TICKET_INFOMATION_REDUCER = 'ticketInfomation';

type ticketInfomationState = {
  ticketInfomation: ITicketCreateDTO;
};

const initialState: ticketInfomationState = { ticketInfomation: {} };
export const ticketInfomationSlice = createSlice({
  name: QMS_TICKET_INFOMATION_REDUCER,
  initialState,
  reducers: {
    setTicketInfomation(state, action) {
      state.ticketInfomation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTicketInfomation } = ticketInfomationSlice.actions;
export const ticketInfomationReducer = ticketInfomationSlice.reducer;
export const getTicketInfomation = (state: RootState) => state.ticketInfomation;
