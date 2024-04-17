import { IModalityTypeDTO, IOrderRequestDTO } from '@/types/dto';

import { formatDateTime, getCurrentDateTime } from '../dateUtils';

/**
 * thời gian thực hiện đối với ca DICOM sẽ lấy từ request ,nếu k có sẽ để trống user tự nhập
 * thời gian thực hiện đối với ca NON DICOM sẽ là thời gian nhận ca
 */
export const getDefaultOperationTimeSubmissionData = ({
  request,
  operationTimeReportSubmission,
  modalityType,
}: {
  request?: IOrderRequestDTO;
  operationTimeReportSubmission: string | undefined;
  modalityType: IModalityTypeDTO;
}) => {
  const requiredDicom = !!modalityType.requireDicom;
  const operationTime =
    request && request.operationTime ? request.operationTime : undefined;
  const execOperationTime = operationTime
    ? operationTime
    : requiredDicom
    ? ''
    : formatDateTime(getCurrentDateTime());

  return operationTimeReportSubmission ?? execOperationTime;
};
