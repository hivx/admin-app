import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks';
import { useViewer } from '@/hooks/order/useViewer';
import { getButtonViewImageState } from '@/lib/dataHelper/radiologyReport/getButtonViewImageState';
import { IOrderDTO } from '@/types/dto';

import { setRadiologyReportButtonState } from '../../../stores/OrderRadiology';
import { useCurrentOrderID } from '../providers';

type Options = {
  orders: IOrderDTO[];
};
function useViewImageButton(options: Options) {
  const { orders } = options;
  const buttonState = getButtonViewImageState(orders);
  const currentOrderID = useCurrentOrderID();
  const dispatch = useAppDispatch();
  const { openInNewTab } = useViewer({ orderIDs: orders.map((order) => order.id) });

  useEffect(() => {
    if (currentOrderID) {
      dispatch(
        setRadiologyReportButtonState({
          orderID: currentOrderID,
          button: 'VIEW_IMAGE',
          state: buttonState,
        }),
      );
    }
  }, [buttonState, currentOrderID, dispatch]);

  return {
    buttonState,
    onClick: () => openInNewTab(),
    onListItemClick: () => openInNewTab(),
  };
}

export default useViewImageButton;
