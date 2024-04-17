import { useLazyGetIsValidTimeQuery } from '@/api/insuranceConflict';
import { useGetOneOrderQuery } from '@/api/order';
import { useNotifyModal, useNotifySnackbar } from '@/providers/NotificationProvider';
import { selectCurrentUser } from '@/stores/auth';
import { setErrorRadiologyDateTime } from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IRadiologyReportSubmissionData } from '@/types/radiology/reportContext';

import { useAppDispatch, useAppSelector, useTranslate } from '..';
import { useGetDelayTime } from '../order/useGetDelayTime';

import { getApproveReportData } from './useApproveReport';

type VerifyDelayTimeType = {
  orderID?: BaseEntity['id'];
  requestID?: BaseEntity['id'];
  reportSubmission?: IRadiologyReportSubmissionData;
  isRadiologyPage?: boolean;
};

export const useVerifyDelayTime = ({
  orderID,
  requestID,
  reportSubmission,
  isRadiologyPage = false,
}: VerifyDelayTimeType) => {
  const dispatch = useAppDispatch();
  const notifyModal = useNotifyModal();
  const translate = useTranslate();
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: order } = useGetOneOrderQuery(
    {
      id: orderID ?? 0,
    },
    { skip: !orderID },
  );
  const getModalityTypeDelayTime = useGetDelayTime();
  const approveReportData =
    reportSubmission && getApproveReportData({ data: reportSubmission });

  const [trigger] = useLazyGetIsValidTimeQuery();

  /**
   * Kiểm tra thời gian chỉ định, thời gian thực hiện, thời gian duyệt
   */
  const checkDelayTime = async (callback: () => void) => {
    let isValidTime = false;
    if (order?.insuranceApplied && orderID && requestID) {
      if (approveReportData && currentUser) {
        const { approvedModalityID, approvedTime, operationTime } = approveReportData;
        if (approvedTime && operationTime) {
          const data = await trigger({
            approvedModalityID,
            approvedTime,
            operationTime,
            approverID: currentUser?.id,
            orderID,
            requestID,
          }).unwrap();
          isValidTime = data;
        }
      }
      if (!isValidTime) {
        if (order?.modalityType) {
          const { delayTimeToApproval, delayTimeToOperation } =
            await getModalityTypeDelayTime(order?.modalityType);

          notifyModal({
            message: translate.messages.notification.invalidApprovalTime({
              periodOne: delayTimeToOperation.toString(),
              periodTwo: delayTimeToApproval.toString(),
              type: order?.modalityType,
            }),
            options: {
              variant: 'warning',
              onConfirm: () => {
                isRadiologyPage &&
                  dispatch(
                    setErrorRadiologyDateTime({
                      orderID,
                      requestID,
                      errorOperationTime: true,
                      errorApprovedTime: true,
                    }),
                  );
              },
              onCancel: () => {},
              confirmLabel: 'Kiểm tra lại',
              hideOptionalButton: true,
            },
          });
        }
      }
    } else {
      isValidTime = true;
    }

    return isValidTime;
  };

  return { checkDelayTime };
};
