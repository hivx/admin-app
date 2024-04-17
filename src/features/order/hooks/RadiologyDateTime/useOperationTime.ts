import { filterModalCreateNonDicom } from '@/dataHelper/filterModalCreateNonDicom';
import { useAppSelector } from '@/hooks';
import { selectRadiologyReportSubmission } from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IOrderRequestDTO, IStudyDTO } from '@/types/dto';
import { itechDateTimeToDayjs } from '@/utils/dateUtils';

/**
 * Trả ra giá trị thời gian để hiển thị ở trường Thực hiện
 * Giá trị của thời gian thực hiện lần lượt ưu tiên lấy theo:
 * Thời gian có ảnh DICOM studyTime -> thời gian thực hiện operationTime -> thời gian nhận ca
 * Nếu ca đã duyệt, Giá trị của thời gian thực hiện lần lượt ưu tiên lấy theo:
 * thời gian thực hiện operationTime -> Thời gian có ảnh DICOM studyTime  -> thời gian nhận ca
 */
export const useOperationTime = ({
  request,
  study,
  orderID,
  isDisabledField,
}: {
  request: IOrderRequestDTO;
  study: IStudyDTO | null;
  orderID: BaseEntity['id'];
  isDisabledField: boolean;
}) => {
  const reportSubmission = useAppSelector(
    selectRadiologyReportSubmission({ orderID, requestID: request.id }),
  );
  const isNondicom = filterModalCreateNonDicom(request?.modality?.modalityType ?? '');

  const operationTime =
    request && request.operationTime ? itechDateTimeToDayjs(request.operationTime) : null;
  const studyTime = isNondicom
    ? null
    : study && study.studyTime
    ? itechDateTimeToDayjs(study.studyTime)
    : null;

  /**
   * Giá trị hiển thị ở trường Thời gian thực hiện khi disabled,
   */
  const disabledValue = operationTime ?? studyTime;
  /**
   * Giá trị hiển thị ở trường Thời gian thực hiện  khi active,
   */
  const activeValue =
    disabledValue ?? itechDateTimeToDayjs(reportSubmission?.operationTime ?? null);

  return isDisabledField ? disabledValue : activeValue;
};
