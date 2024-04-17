import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/stores/redux';
import { IOrderRequestDTOCreate, IProcedureDTO } from '@/types/dto';

export const CREATE_ORDER_REDUCER = 'createOrder';
type CreateOrder = {
  requests: IOrderRequestDTOCreate[];
  modalityType: string;
  currentProcedure: IProcedureDTO | null;
  procedures: IProcedureDTO[];
};
export const DEFAULT_CREATE_ORDER = {
  requests: [],
  modalityType: '',
  currentProcedure: null,
  procedures: [],
};
const initialState: CreateOrder = DEFAULT_CREATE_ORDER;

export const createOrderSlice = createSlice({
  name: CREATE_ORDER_REDUCER,
  initialState,
  reducers: {
    setOrderRequestData(state, action: PayloadAction<IOrderRequestDTOCreate>) {
      if (
        !state.requests.find((item) => item.procedureID === action.payload.procedureID)
      ) {
        state.requests = [...state.requests, action.payload];
      } else {
        state.requests.map((request, index) => {
          if (request.procedureID === action.payload.procedureID) {
            state.requests[index] = action.payload;
          }
        });
      }
    },
    setProcedures(state, action: PayloadAction<IProcedureDTO>) {
      if (!state.procedures.find((item) => item.id === action.payload.id)) {
        state.procedures = [...state.procedures, action.payload];
      } else {
        state.procedures.map((procedure, index) => {
          if (procedure.id === action.payload.id) {
            state.procedures[index] = action.payload;
          }
        });
      }
    },
    deleteOrderRequestData(state, action) {
      state.requests = state.requests.filter(
        (item) => !(item.procedureID === action.payload),
      );
    },
    deleteProcedure(state, action) {
      state.procedures = state.procedures.filter((item) => !(item.id === action.payload));
    },
    resetOrderRequestData(state) {
      state.modalityType = DEFAULT_CREATE_ORDER.modalityType;
      state.requests = DEFAULT_CREATE_ORDER.requests;
      state.currentProcedure = DEFAULT_CREATE_ORDER.currentProcedure;
      state.procedures = DEFAULT_CREATE_ORDER.procedures;
    },
    setModalityType(state, action) {
      state.modalityType = action.payload;
    },
    setCurrentProcedureData(state, action: PayloadAction<IProcedureDTO>) {
      if (state.currentProcedure && action.payload.id !== state.currentProcedure.id) {
        state.currentProcedure = action.payload;
      } else if (!state.currentProcedure) {
        state.currentProcedure = action.payload;
      }
    },
    deleteCurrentProcedure(state) {
      state.currentProcedure = DEFAULT_CREATE_ORDER.currentProcedure;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOrderRequestData,
  deleteOrderRequestData,
  setModalityType,
  resetOrderRequestData,
  setCurrentProcedureData,
  setProcedures,
  deleteProcedure,
  deleteCurrentProcedure,
} = createOrderSlice.actions;
export const createOrderReducer = createOrderSlice.reducer;
export const selectOrderRequestData = (state: RootState) => state.createOrder.requests;
export const selectProcedures = (state: RootState) => state.createOrder.procedures;
export const selectModalityType = (state: RootState) => state.createOrder.modalityType;
export const selectCurrentProcedureData = (state: RootState) =>
  state.createOrder.currentProcedure;
