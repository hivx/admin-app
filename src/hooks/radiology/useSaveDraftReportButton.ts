import { useEffect } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { HOTKEYS } from '@/config';
import { useCurrentOrderID, useRadiologyReportFunctions } from '@/features/order';
import { useAppDispatch, useAppSelector, useKeybinds } from '@/hooks';
import { IUserPermissions } from '@/lib/dataHelper/getUserPermissisons';
import { useUserPermission } from '@/providers/AuthProvider';
import {
  selectCurrentRequestID,
  selectRadiologyReportButtonsState,
  setRadiologyReportButtonState,
} from '@/stores/OrderRadiology';
import { BUTTON_STATE } from '@/types';
import { IRadiologyReportButtonHandler } from '@/types/order/buttons';

export const useSaveDraftReportButton = (): IRadiologyReportButtonHandler => {
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));

  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const requestFromRequestID = order?.requests?.find(
    (request) => request.id === requestID,
  );

  const radiologyReportFunctions = useRadiologyReportFunctions();

  const saveDraftButtonState = useAppSelector(
    selectRadiologyReportButtonsState(orderID, 'SAVE_DRAFT'),
  );
  const userPermissions = useUserPermission();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (order) {
      let buttonState = BUTTON_STATE.DISABLED;
      /**
       * Điều kiện active nút Lưu kết quả
       * Có quyền Lưu nháp
       * Yêu cầu chụp (request) chưa có kết quả đã duyệt (finalReportID = null)
       * Order đã đc khóa
       */
      if (
        getIsEnableSaveReport(userPermissions) &&
        !requestFromRequestID?.finalReportID &&
        !!order.lockedBy
      ) {
        buttonState = BUTTON_STATE.ACTIVE;
      }
      dispatch(
        setRadiologyReportButtonState({
          orderID,
          button: 'SAVE_DRAFT',
          state: buttonState,
        }),
      );
    }
  }, [dispatch, order, orderID, requestFromRequestID?.finalReportID, userPermissions]);

  const handleClick = async () => await radiologyReportFunctions.saveDraftReport();

  useKeybinds(HOTKEYS.SAVE_DRAFT_REPORT.key, () => handleClick(), {
    disabled: saveDraftButtonState === BUTTON_STATE.DISABLED,
  });
  return {
    buttonState: saveDraftButtonState || BUTTON_STATE.DISABLED,
    onClick: handleClick,
    onListItemClick: handleClick,
  };
};

/**
 * Check SƠ BỘ khả năng lưu nháp được
 */
export const getIsEnableSaveReport = (permissions: IUserPermissions): boolean =>
  !!permissions?.userCanSaveReport;
