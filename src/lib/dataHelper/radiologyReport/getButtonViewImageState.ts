import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

export const getButtonViewImageState = (orders: IOrderDTO[]): BUTTON_STATE => {
  if (!orders.length) return BUTTON_STATE.DISABLED;
  const hasStudyArray = orders
    .map((order) => !!order.study)
    // filter out false values
    .filter((bool) => bool);
  if (hasStudyArray.length === orders.length) {
    // all orders have study
    return BUTTON_STATE.ACTIVE;
  }
  return BUTTON_STATE.DISABLED;
};
