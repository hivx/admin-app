import { useLazyGetInsuranceConflictQuery } from '@/api/insuranceConflict';
import { useNotifyModal } from '@/providers/NotificationProvider';
import { selectCurrentUser } from '@/stores/auth';
import { setErrorRadiologyDateTime } from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IOrderDTO } from '@/types/dto';
import { IRadiologyReportSubmissionData } from '@/types/radiology/reportContext';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { useAppDispatch, useAppSelector, useTranslate } from '..';
import { useGetDelayTime } from '../order/useGetDelayTime';

import { getApproveReportData } from './useApproveReport';

type WarningInsuranceConflictType = {
  orderID?: BaseEntity['id'];
  requestID?: BaseEntity['id'];
  reportSubmission?: IRadiologyReportSubmissionData;
  approverID?: BaseEntity['id'];
  isRadiologyPage?: boolean;
};

/**
 * Hook xử lý logic kiểm tra các ca bảo hiểm
 */
export const useWarningInsuranceConflict = ({
  orderID,
  requestID,
  reportSubmission,
  approverID,
  isRadiologyPage,
}: WarningInsuranceConflictType) => {
  const [trigger] = useLazyGetInsuranceConflictQuery();
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const notifyModal = useNotifyModal();
  const currentUser = useAppSelector(selectCurrentUser);

  const approveReportData =
    reportSubmission && getApproveReportData({ data: reportSubmission });
  const getModalityTypeDelayTime = useGetDelayTime();
  const getWarning = async () => {
    if (approveReportData && currentUser && orderID && requestID) {
      const { approvedModalityID, approvedTime, operationTime } = approveReportData;
      if (approvedTime && operationTime) {
        const data = await trigger({
          approvedModalityID,
          approvedTime,
          operationTime,
          approverID: approverID
            ? approverID
            : isRadiologyPage
            ? currentUser?.id
            : undefined,
          orderID,
          requestID,
          operatorIDs: approveReportData.operatorIDs,
        }).unwrap();
        return data;
      }
    }
  };

  const notifyConflict = async ({
    order,
    callback,
  }: {
    order?: IOrderDTO;
    callback: () => void;
  }) => {
    if (order?.requests && order?.requests[0]) {
      /**
       * request trùng request hiện tại -> bị conflict thời gian ,hoặc quá định mức máy chụp
       */
      if (order.requests[0].id === requestID) {
        // bị conflict thời gian
        if (order.requests[0].finalApprovedTime && order.requests[0].operationTime) {
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
                        orderID: order.id,
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
        } else if (order.requests[0].modalityID) {
          // quá định mức máy chụp

          notifyModal({
            message: translate.messages.notification.isOutOfCapability({
              capability: order.requests[0]?.modality?.capability?.toString() ?? '',
              code: order.requests[0]?.modality?.code?.toString() ?? '',
              insurance: order.requests[0]?.modality?.insurance?.toString() ?? '',
              name: order.requests[0]?.modality?.name?.toString() ?? '',
            }),
            options: {
              variant: 'warning',
              onCancel: () => {
                callback();
              },
              confirmLabel: 'Kiểm tra lại',
              cancelLabel: 'Bỏ qua',
              onConfirm: () => {},
            },
          });
        }
        return;
      }

      if (order.requests[0].operators) {
        notifyModal({
          message: translate.messages.notification.approvalConflict({
            pName: order?.patient?.fullname ?? '',
            approveTime:
              itechDateTimeToDayjs(order?.requests[0].finalApprovedTime)?.format(
                DISPLAY_FORMAT.dateTimeNoSecond,
              ) ?? '',
            operationTime:
              itechDateTimeToDayjs(order?.requests[0].operationTime)?.format(
                DISPLAY_FORMAT.dateTimeNoSecond,
              ) ?? '',
            accessionNumber: order?.accessionNumber ?? '',
            approver:
              order?.requests[0]?.operators.map((item) => item.fullname).join(',') ?? '',
            procedure: order.requests[0].procedure?.name ?? '',
          }),
          options: {
            variant: 'warning',
            onConfirm: () => {},
            onCancel: () => {},
            confirmLabel: 'Kiểm tra lại',
            hideOptionalButton: true,
          },
        });
      }

      notifyModal({
        message: translate.messages.notification.approvalConflict({
          pName: order?.patient?.fullname ?? '',
          approveTime:
            itechDateTimeToDayjs(order?.requests[0].finalApprovedTime)?.format(
              DISPLAY_FORMAT.dateTimeNoSecond,
            ) ?? '',
          operationTime:
            itechDateTimeToDayjs(order?.requests[0].operationTime)?.format(
              DISPLAY_FORMAT.dateTimeNoSecond,
            ) ?? '',
          accessionNumber: order?.accessionNumber ?? '',
          approver: order?.requests[0].finalApprover?.fullname ?? '',
          procedure: order.requests[0].procedure?.name ?? '',
        }),
        options: {
          variant: 'warning',
          onConfirm: () => {},
          onCancel: () => {},
          confirmLabel: 'Kiểm tra lại',
          hideOptionalButton: true,
        },
      });
    }
  };

  const getConflict = async ({ approveCallback }: { approveCallback: () => void }) => {
    const approvalConflict = await getWarning();
    if (approvalConflict) {
      notifyConflict({
        order: approvalConflict,
        callback: () => approveCallback(),
      });
    } else {
      approveCallback();
    }
  };

  return {
    getConflict,
  };
};
