import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useGetOneRadiologyReportQuery } from '@/api/radiologyReport';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';
import { IRadiologyReportSubmissionData } from '@/types/radiology/reportContext';

import { useApproveReport } from '../radiology/useApproveReport';
import { useApproveReportButton } from '../radiology/useApproveReportButton';
export type OrderPanelApproveButtonProps = {
  order: IOrderDTO;
  request: IOrderRequestDTO;
  reportID?: IRadiologyReportDTO['id'];
  /**
   * localSubmissionData :dữ liệu lưu trong stores
   * Nút Duyệt nhanh cần các dữ liệu để có thể update cho report khi /PUT approve
   */
  localSubmissionData?: IRadiologyReportSubmissionData;
};
/**
 * Hook dùng cho nút Duyệt nhanh (Duyệt report đã được lưu nháp)
 * @param props { order, reportID, request }
 * @returns dynamicApproveButtonState, onClickApprove
 */
export const useQuickApproveButton = (props: OrderPanelApproveButtonProps) => {
  const { order, reportID, request, localSubmissionData } = props;

  const isReportInRequest =
    request?.reports && reportID
      ? !!request.reports.map((item) => item.id).includes(reportID)
      : false;

  const { data: reportData } = useGetOneRadiologyReportQuery(
    order?.id && request?.id && reportID && isReportInRequest
      ? {
          orderID: order.id,
          requestID: request.id,
          reportID,
        }
      : skipToken,
  );
  /**
   * Report có thể Duyệt khi  có dữ liệu của report và request hiện tại chưa từng được duyệt
   */
  const reportApproveAble = reportData ? !request.finalReportID : false;
  /**
   * func approve report
   */
  const approveReport = useApproveReport({ order, request });

  /**
   * Report data to approve
   */
  const getReportSubmission = (): IRadiologyReportSubmissionData => {
    return {
      comments: reportData?.comments ?? '',
      findings: reportData?.findings ?? '',
      impression: reportData?.impression ?? '',
      description: reportData?.description ?? '',
      operatorIDs:
        localSubmissionData?.operatorIDs ?? request?.operators?.map((item) => item.id),
      approvedModalityID:
        localSubmissionData?.approvedModalityID ?? request.modality?.id ?? 0,
      imageFileIDs: reportData?.imageFileIDs ?? null,
      images: reportData?.images ?? null,
      id: reportData?.id,
      approvedTime: localSubmissionData?.approvedTime,
      operationTime: localSubmissionData?.operationTime,
      reporterID: localSubmissionData?.reporterID,
      operators: localSubmissionData?.operators ?? request?.operators ?? undefined,
    };
  };
  const { buttonState: approveButtonState, onClick: onClickApprove } =
    useApproveReportButton({
      orderID: order.id,
      requestID: request.id,
      approveReportFunction: approveReport,
      reportSubmission: getReportSubmission(),
      isQuickApprove: true,
    });
  const execButtonState = !reportApproveAble ? BUTTON_STATE.DISABLED : approveButtonState;

  return { dynamicApproveButtonState: execButtonState, onClickApprove };
};
