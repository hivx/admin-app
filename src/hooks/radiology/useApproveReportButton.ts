import { useLazyGetOneModalityTypeByNameQuery } from '@/api/modalityType';
import { useGetOneOrderQuery } from '@/api/order';
import { usePrintRadiologyReport } from '@/hooks/order/usePrintRadiologyReport';
import { getBooleanValueOfAttribute } from '@/lib/dataHelper/modalityTypeAttributesHelper';
import { isValidTimeInForm } from '@/lib/dataHelper/radiologyReport/isValidTimeInForm';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { setErrorRadiologyDateTime } from '@/stores/OrderRadiology';
import { getOrderLayout } from '@/stores/OrderRadiology/orderLayoutSlice';
import { BaseEntity } from '@/types';
import { MODALITY_TYPE_ATTRIBUTE_DEFAULT } from '@/types/dto/modalityTypeAttribute';
import { IRadiologyReportButtonHandler } from '@/types/order/buttons';
import {
  IRadiologyReportContextFunctions,
  IRadiologyReportSubmissionData,
} from '@/types/radiology/reportContext';

import { useAppDispatch, useAppSelector } from '..';

import { useApproveButtonState } from './useApproveButtonState';
import { useWarningInsuranceConflict } from './useWarningInsuranceConflict';

type ApproveReportButtonState = IRadiologyReportButtonHandler & {
  buttonLabel: string;
};
type ApproveReportButtonProps = {
  orderID: BaseEntity['id'];
  requestID: BaseEntity['id'];
  reportSubmission?: IRadiologyReportSubmissionData;
  setIsApproveButtonClicked?: () => void;
  approveReportFunction: IRadiologyReportContextFunctions['approveReport'];
  openModalPrintRadiologyReport?: IRadiologyReportContextFunctions['openModalPrintRadiologyReport'];
  isQuickApprove: boolean;
};

/**
 * Hook của button Duyệt ở Màn
 * Viết kết quả và Dynamic side
 * Xử lý Duyệt + ký số
 */
export const useApproveReportButton = (
  props: ApproveReportButtonProps,
): ApproveReportButtonState => {
  const {
    orderID,
    requestID,
    reportSubmission,
    setIsApproveButtonClicked,
    approveReportFunction,
    openModalPrintRadiologyReport,
    isQuickApprove = false,
  } = props;
  // const notifyModal = useNotifyModal();
  const [triggerGetOneModalityTypeByName] = useLazyGetOneModalityTypeByNameQuery();
  const { buttonState, buttonLabel } = useApproveButtonState('APPROVE');
  const { signReport } = usePrintRadiologyReport({ orderID, requestID });
  const template = useAppSelector(getOrderLayout());

  const { data: order } = useGetOneOrderQuery({ id: orderID }, { skip: !orderID });
  const dispatch = useAppDispatch();
  const notify = useNotifySnackbar();

  /**
   * kiểm tra ràng buộc với ca bảo hiểm
   */
  const { getConflict } = useWarningInsuranceConflict({
    orderID,
    requestID,
    reportSubmission,
    isRadiologyPage: true,
  });

  const handleCheckConflictBeforeApprove = async () => {
    if (reportSubmission) {
      if (order?.modalityType) {
        const modalityType = await triggerGetOneModalityTypeByName({
          name: order?.modalityType,
        }).unwrap();
        // Có KTV mới thực hiện bước tiếp theo
        if (
          !reportSubmission?.operators ||
          (reportSubmission?.operators?.length === 0 &&
            modalityType.attributes &&
            getBooleanValueOfAttribute(
              modalityType.attributes,
              MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRES_TECHNICIAN,
            ))
        ) {
          notify({
            message: 'Kiểm tra lại KTV trước khi duyệt',
            options: { variant: 'warning' },
          });
          return;
        }
      }

      // Thời gian thỏa mãn diều kiễn mới qua bước tiếp theo
      if (
        !isValidTimeInForm({
          approvedTime: reportSubmission.approvedTime,
          operationTime: reportSubmission.operationTime,
          requestedTime: order?.requestedTime ?? undefined,
        })
      ) {
        dispatch(
          setErrorRadiologyDateTime({
            orderID,
            requestID,
            errorOperationTime: true,
            errorApprovedTime: true,
          }),
        );
        notify({
          message: 'Kiểm tra lại thời gian trước khi duyệt',
          options: { variant: 'warning' },
        });
        return;
      } else {
        dispatch(
          setErrorRadiologyDateTime({
            orderID,
            requestID,
            errorOperationTime: false,
            errorApprovedTime: false,
          }),
        );
      }

      if (order?.insuranceApplied) {
        getConflict({ approveCallback: handleClick });
      } else {
        handleClick();
      }
    }
  };

  const handleClick = async () => {
    /**
     * Sign report logic: IF numOfImages = 0 we will call API sign report directly
     * numOfImages > 0 we will open modal select images
     * numOfImages = undefined do nothing
     * numOfImage = 0 --> prepare PDF and print and sign
     */
    if (!template || !template.id) {
      approveReportFunction({
        onSuccessCallback: setIsApproveButtonClicked && setIsApproveButtonClicked,
        reportSubmission,
        isQuickApprove,
      });
    } else if (template.keyImageNames?.length === 0) {
      approveReportFunction({
        onSuccessCallback: async (reportID, order) => {
          setIsApproveButtonClicked && setIsApproveButtonClicked();
          signReport(
            orderID,
            requestID,
            reportID,
            template.id,
            reportSubmission?.images ?? null,
            undefined,
          );
        },
        reportSubmission,
        isQuickApprove,
      });
    } else {
      approveReportFunction({
        onSuccessCallback: async (reportID, order) => {
          setIsApproveButtonClicked && setIsApproveButtonClicked();
          // CHƯA CHỌN ẢNH VẪN CHO KÝ, CẦN XỬ LÝ LẠI KHI CÓ LOGIC CHỌN ẢNH
          signReport(
            orderID,
            requestID,
            reportID,
            template.id,
            reportSubmission?.images ?? null,
            undefined,
          );
        },
        reportSubmission,
        isQuickApprove,
      });
    }
  };
  return {
    buttonLabel,
    buttonState,
    onClick: handleCheckConflictBeforeApprove,
    onListItemClick: handleCheckConflictBeforeApprove,
  };
};
