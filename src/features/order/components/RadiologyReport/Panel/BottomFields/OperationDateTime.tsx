import { Dayjs } from 'dayjs';
import { FC } from 'react';

import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  selectErrorRadiologyDateTime,
  selectRadiologyReportIsEditable,
  selectRadiologyReportSubmission,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';
import { INVALID_DATE, formatDateTime, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { useOrderValidationDatetime } from '../../../../hooks/useOrderValidationDatetime';

import { RadiologyDateTimePicker } from './RadiologyDateTimePicker';

type OperationDateTimeProps = {
  request: IOrderRequestDTO;
  order: IOrderDTO;
};

/**
 * Thời gian thực hiện
 */
export const OperationDateTime: FC<OperationDateTimeProps> = ({ request, order }) => {
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(order.id));
  const reportSubmission = useAppSelector(
    selectRadiologyReportSubmission({ orderID: order.id, requestID: request.id }),
  );
  const approveTimeDayjs = reportSubmission?.approvedTime
    ? itechDateTimeToDayjs(reportSubmission?.approvedTime)
    : null;
  const errorRadiologyDateTime = useAppSelector(
    selectErrorRadiologyDateTime({ orderID: order.id, requestID: request.id }),
  );
  const translate = useTranslate();
  const { checkValidationOperationTime, checkValidationApprovedTime } =
    useOrderValidationDatetime({
      order,
      request,
    });
  const dispatch = useAppDispatch();

  const operationTime = reportSubmission?.operationTime
    ? itechDateTimeToDayjs(reportSubmission.operationTime)
    : null;

  /**
   * Thay đổi thời gian thực hiện,
   * Cần check đồng thời thời gian thực hiện mới, thời gian duyệt có thỏa mãn điều kiện hay không,
   * lưu thời gian thực hiện mới vào store
   */
  const onChangeOperationTime = (newValue: Dayjs | null, currentValue: Dayjs | null) => {
    const formatDayjsToDateTimeString = formatDateTime(newValue);
    if (order?.id && request?.id && formatDayjsToDateTimeString !== INVALID_DATE) {
      checkValidationOperationTime(newValue, approveTimeDayjs);
      checkValidationApprovedTime(approveTimeDayjs, newValue);
      dispatch(
        setRadiologyReportSubmissionData({
          orderID: order?.id,
          requestID: request?.id,
          operationTime: formatDayjsToDateTimeString,
        }),
      );
    }
  };

  return (
    <RadiologyDateTimePicker
      onChange={onChangeOperationTime}
      value={operationTime}
      error={errorRadiologyDateTime?.errorOperationTime}
      disabled={!isEditable}
      label={translate.resources.order.request.operationTime()}
    />
  );
};
