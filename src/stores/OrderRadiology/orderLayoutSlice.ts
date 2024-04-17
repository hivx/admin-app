import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseEntity } from '@/types';
import { ILayoutDTO } from '@/types/dto';

import { RootState } from '../redux';

export const ORDER_LAYOUT_REDUCER = 'orderLayout';

type OrderLayoutType = Partial<
  Pick<ILayoutDTO, 'keyImageNames' | 'numOfImages' | 'name'>
> &
  BaseEntity;

const initialState: { layout?: OrderLayoutType; layouts: OrderLayoutType[] } = {
  layout: undefined,
  layouts: [],
};

export const layoutSlice = createSlice({
  name: ORDER_LAYOUT_REDUCER,
  initialState,
  reducers: {
    setOrderLayout: (state, action: PayloadAction<OrderLayoutType>) => {
      state.layout = action.payload;
    },
    setOrderLayouts: (state, action: PayloadAction<OrderLayoutType[]>) => {
      state.layouts = action.payload;
    },
  },
});

export const { setOrderLayout, setOrderLayouts } = layoutSlice.actions;
export const orderLayoutReducer = layoutSlice.reducer;
export const getOrderLayout = () => (state: RootState) => state.orderLayout.layout;
export const getOrderLayouts = () => (state: RootState) => state.orderLayout.layouts;
