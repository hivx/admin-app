import { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';

import { OrderPanelRequest } from '@/components/Order/Panel/OrderPanelRequest';
import { useRadiologyReportFunctions } from '@/features/order';
import { useAppDispatch } from '@/hooks';
import { useLockOrderButton } from '@/hooks/lockOrder/useLockOrderButton';
import { setCurrentActiveReportID, setCurrentRequestID } from '@/stores/OrderRadiology';
import { BUTTON_STATE } from '@/types';

import { PAGE_ID } from '../components/order/MobileRadiologyReportPage';
import { OrderInfomationMainProps } from '../components/order/orderInfomation/OrderInfomationMain';
import { DEFAULT_REDIRECT_MOBILE } from '../routes';

export const useMobileOrderInfomation = ({
  order,
  setCurrentPage,
}: OrderInfomationMainProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const radiologyReportFunctions = useRadiologyReportFunctions();
  const { buttonState, onClick: onLockOrder } = useLockOrderButton();
  const navigateToRadiologyReport = () => {
    setCurrentPage(PAGE_ID.RADIOLOGY_PAGE);
  };

  /**
   * when click button 'Nhận ca'
   */
  const lockOrder = async () => {
    const isLocked = await onLockOrder();
    if (isLocked) {
      navigateToRadiologyReport();
    }
  };

  /**
   * when click icon back in topbar
   */
  const onBackward = () => {
    navigate(DEFAULT_REDIRECT_MOBILE);
  };

  /**
   * when change report
   */
  const onReportChanged: ComponentProps<typeof OrderPanelRequest>['onReportChanged'] = (
    reportID,
    requestID,
  ) => {
    dispatch(setCurrentRequestID({ orderID: order.id ?? 0, requestID }));
    dispatch(setCurrentActiveReportID({ orderID: order.id, activeReportID: reportID }));
    radiologyReportFunctions.fetchAndSetReport(requestID, reportID);
    navigateToRadiologyReport();
  };

  return {
    onReportChanged,
    lockOrder,
    disableButtonLock: buttonState === BUTTON_STATE.DISABLED,
    navigateToRadiologyReport,
    onBackward,
  };
};
