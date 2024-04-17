import { useCurrentOrderID, useRadiologyReportFunctions } from '@/features/order';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useApproveReportButton } from '@/hooks/radiology/useApproveReportButton';
import {
  selectCurrentRequestID,
  selectRadiologyReportSubmission,
  setRadiologyReportIsApproveButtonClicked,
} from '@/stores/OrderRadiology';

/**
 * Hook dùng cho nút Duyệt trong màn Viết kết quả Mobile và desktop
 */
export const useRadiologyApproveReportButton = () => {
  const radiologyReportFunctions = useRadiologyReportFunctions();
  const dispatch = useAppDispatch();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));

  const setIsApproveButtonClicked = () => {
    dispatch(
      setRadiologyReportIsApproveButtonClicked({ orderID, isApproveButtonClicked: true }),
    );
  };
  const reportSubmission = useAppSelector(
    selectRadiologyReportSubmission({ orderID, requestID }),
  );

  const { buttonLabel, buttonState, onClick, onListItemClick } = useApproveReportButton({
    orderID,
    requestID,
    reportSubmission,
    approveReportFunction: radiologyReportFunctions.approveReport,
    setIsApproveButtonClicked,
    openModalPrintRadiologyReport: radiologyReportFunctions.openModalPrintRadiologyReport,
    isQuickApprove: false,
  });

  const onClickCombineButtonApprove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClick(e);
  };

  return {
    buttonLabel,
    buttonState,
    onClick,
    onClickCombineButtonApprove,
    onListItemClick,
  };
};
