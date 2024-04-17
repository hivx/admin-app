import { useViewer } from '@/hooks/order/useViewer';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';
type ICompareStudy = {
  fisrtOrder?: IOrderDTO;
  secondOrder?: IOrderDTO;
};
/**
 * Get CompareStudyMenuItem menuState && func when click compare menu item
 * @param options
 * @returns
 */
export const useCompareStudyMenuItem = (options: ICompareStudy = {}) => {
  const { fisrtOrder, secondOrder } = options;
  const hasStudy = fisrtOrder?.study && secondOrder?.study ? true : false;
  const fisrtOrderID = fisrtOrder?.id;
  const secondOrderID = secondOrder?.id;
  const orderIDs =
    fisrtOrderID && secondOrderID && secondOrderID !== fisrtOrderID
      ? [fisrtOrderID, secondOrderID]
      : [];
  const { openInNewTab } = useViewer({
    orderIDs,
  });

  const menuState: BUTTON_STATE =
    orderIDs.length > 0 && hasStudy ? BUTTON_STATE.ACTIVE : BUTTON_STATE.DISABLED;

  return { menuState, openInNewTab };
};
