import { useCreateLockMutation, useLazyGetOneOrderQuery } from '@/api/order';
import {
  useApproveOneRadiologyReportMutation,
  useQuickApproveOneRadiologyReportMutation,
} from '@/api/radiologyReport';
import { useAppSelector } from '@/hooks';
import { useDeleteLockOrder } from '@/hooks/lockOrder/useDeleteLockOrder';
import { useNotifyReportActions } from '@/hooks/order/useNotifyReportActions';
import { getCommonImagesSubmissionForOrderReport } from '@/lib/dataHelper/radiologyReport/getPatientPortalURL';
import {
  APPROVE_ORDER_VALIDATION_STATUS,
  IsOrderApprovableResult,
  getIsOrderApprovableLazy,
} from '@/lib/dataHelper/radiologyReport/validateApproveOrder';
import { selectCurrentUser } from '@/stores/auth';
import {
  IOrderDTO,
  IOrderRequestDTO,
  IRadilogyReportDTOApprove,
  IRadilogyReportDTOCreate,
  IRadiologyReportDTO,
} from '@/types/dto';
import { IRadiologyReportSubmissionData } from '@/types/radiology/reportContext';
import { formatDateTime, getCurrentDateTime } from '@/utils/dateUtils';

import { IRadiologyReportCallbacks } from './useRadiologyReport';
import { useUserDuringWorkShift } from './useUserDuringWorkShift';

type useApproveReportProps = {
  request?: IOrderRequestDTO;
  callbacks?: IRadiologyReportCallbacks;
  order: IOrderDTO;
};

/**
 * @returns approveReport func
 */
export const useApproveReport = (props: useApproveReportProps) => {
  const { request, order, callbacks } = props;
  const [triggerLockOrder] = useCreateLockMutation();
  const [triggerGetOneOrder] = useLazyGetOneOrderQuery();
  const [triggerApproveReport] = useApproveOneRadiologyReportMutation();
  const [triggerQuickApproveReport] = useQuickApproveOneRadiologyReportMutation();
  const { deleteLockOrder } = useDeleteLockOrder(order.id);
  const {
    notifyApproveSuccess,
    notifyApproveError,
    notifyApprovedByOtherError,
    notifyLockedByOtherError,
  } = useNotifyReportActions();
  const checkUserInShift = useUserDuringWorkShift();
  const user = useAppSelector(selectCurrentUser);

  const approveReport = async ({
    onSuccessCallback,
    reportSubmission,
    isQuickApprove = false,
  }: {
    approvedTime?: string;
    onSuccessCallback?: (reportID: IRadiologyReportDTO['id'], order: IOrderDTO) => void;
    reportSubmission?: IRadiologyReportSubmissionData;
    /**
     * quick approve :gọi api PUT, duyệt 1 report đã được lưu nháp
     */
    isQuickApprove?: boolean;
  } = {}) => {
    const isUserInShift = await checkUserInShift();
    // Không xử lý tiếp quá trình duyệt ca,nếu người dùng không trong ca làm việc, với ca BHYT
    if (!isUserInShift && order.insuranceApplied) {
      return;
    }
    if (user && request && reportSubmission) {
      // define submit report function
      const submitReport = async (validateResult: IsOrderApprovableResult) => {
        if (!validateResult.isLocked) await triggerLockOrder({ id: order.id });
        // TODO: should warn user if findings / impression is empty
        if (reportSubmission) {
          let res;
          // nếu isQuickApprove = true
          // Cần gọi API PUT để Duyệt theo reportID,
          // Nếu không có reportSubmission.id, gọi API POST tạo và duyệt report mới như luồng cũ
          if (reportSubmission.id && isQuickApprove) {
            const {
              approvedTime,
              operationTime,
              operatorIDs,
              approvedModalityID,
              reporterID,
              consumables,
            } = getApproveReportData({
              data: reportSubmission,
            });
            res = await triggerQuickApproveReport({
              orderID: order.id,
              requestID: request.id,
              reportID: reportSubmission.id,
              approvedTime,
              operationTime,
              operatorIDs,
              approvedModalityID,
              reporterID,
              consumables,
            });
          } else {
            const approveData = getApproveReportData({
              data: reportSubmission,
            });

            const commonImages = await getCommonImagesSubmissionForOrderReport(order);
            res = await triggerApproveReport({
              orderID: order.id,
              requestID: request.id,
              reporterID: undefined,
              ...approveData,
              images: {
                ...approveData.images,
                ...commonImages,
              },
            });
          }
          if ('error' in res) {
            notifyApproveError();
          } else {
            // fetch a new order again, ignoring cache
            const newOrder = await triggerGetOneOrder({ id: order.id }, false).unwrap();
            callbacks?.onReportApproved && callbacks.onReportApproved(res.data, newOrder);
            onSuccessCallback && onSuccessCallback(res.data, newOrder);
            notifyApproveSuccess();
            // always unlock study if we have only 1 request
            if (newOrder.requests?.length === 1) deleteLockOrder();
          }
        }
      };
      const getOrderFn = () => triggerGetOneOrder({ id: order.id }).unwrap();
      // perform validation
      const validateResult = await getIsOrderApprovableLazy({
        getOrderFn,
        currentUser: user,
        requestID: request.id,
      });

      switch (validateResult.status) {
        case APPROVE_ORDER_VALIDATION_STATUS.SUCCESS:
          await submitReport(validateResult);
          break;
        case APPROVE_ORDER_VALIDATION_STATUS.SUCCESS_APPROVED_SAME_USER:
          await submitReport(validateResult);
          break;
        case APPROVE_ORDER_VALIDATION_STATUS.FAILURE_APPROVED_BY_OTHER:
          notifyApprovedByOtherError(
            validateResult.request?.finalApprover?.fullname ?? '',
          );
          break;
        case APPROVE_ORDER_VALIDATION_STATUS.FAILURE_LOCKED_BY_OTHER:
          notifyLockedByOtherError(validateResult.order.lockedBy?.fullname ?? '');
          break;
        case APPROVE_ORDER_VALIDATION_STATUS.FAILURE_USER_CANCELLED:
          break;
      }
    }
  };
  return approveReport;
};

/**
 * xử lý và trả ra dữ liệu để Duyệt
 */
export const getApproveReportData = ({
  data,
}: {
  data: IRadiologyReportSubmissionData;
}): IRadilogyReportDTOApprove => {
  const content: IRadiologyReportSubmissionData = {
    ...data,
    findings: data.findings ?? '',
    impression: data.impression ?? '',
    comments: data.comments ?? '',
    operatorIDs: data?.operators?.map((item) => item.id) ?? data?.operatorIDs,
    reporterID: data.reporterID,
    expectedReporterID: undefined,
  };
  return {
    ...content,
    approvedTime: content.approvedTime || formatDateTime(getCurrentDateTime()),
  };
};

/**
 * xử lý và trả ra dữ liệu để lưu nháp
 */
export const getSaveReportData = ({
  data,
}: {
  data: IRadiologyReportSubmissionData;
}): IRadilogyReportDTOCreate => {
  const content: IRadilogyReportDTOCreate = {
    findings: data.findings ?? '',
    impression: data.impression ?? '',
    comments: data.comments ?? '',
    images: data.images ?? undefined,
    reporterID: data.reporterID,
    description: data.description ?? '',
  };

  return content;
};
