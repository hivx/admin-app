import { useAppSelector } from '@/hooks';
import { useViewer } from '@/hooks/order/useViewer';
import { TABLE_ORDER, TABLE_ORDER_HISTORY } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';
type ICompareStudy = {
  fisrtOrderID?: IOrderDTO['id'];
  secondOrderID?: IOrderDTO['id'];
};
/**
 * Compare Study button
 * @param options
 * @returns
 */
export const useCompareStudyButton = (options: ICompareStudy = {}) => {
  const { fisrtOrderID, secondOrderID } = options;
  const rowOrderTableSelected = useAppSelector(
    getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER),
  );
  const rowHistoryTableSelected = useAppSelector(
    getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER_HISTORY),
  );

  let orderIDs: IOrderDTO['id'][];

  if (fisrtOrderID && secondOrderID) {
    orderIDs = [fisrtOrderID, secondOrderID];
  } else {
    orderIDs =
      rowOrderTableSelected?.study?.id && rowHistoryTableSelected?.study?.id
        ? [rowOrderTableSelected.id, rowHistoryTableSelected.id]
        : [];
  }
  const { openInNewTab } = useViewer({
    orderIDs,
  });

  const buttonState: BUTTON_STATE =
    orderIDs.length > 0 ? BUTTON_STATE.ACTIVE : BUTTON_STATE.DISABLED;
  return { buttonState, openInNewTab };
};
