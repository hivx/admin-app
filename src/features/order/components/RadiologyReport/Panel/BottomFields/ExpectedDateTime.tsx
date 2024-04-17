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

import { useExpectedDateTime } from '../../../../hooks/RadiologyDateTime/useExpectedDateTime';
import { useOrderValidationDatetime } from '../../../../hooks/useOrderValidationDatetime';

import { RadiologyDateTimePicker } from './RadiologyDateTimePicker';

type ExpectedDateTimeProps = {
  request: IOrderRequestDTO;
  order: IOrderDTO;
};

/**
 * Thời gian dự kiến kết quả
 */
export const ExpectedDateTime: FC<ExpectedDateTimeProps> = ({ request, order }) => {
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const reportSubmission = useAppSelector(
    selectRadiologyReportSubmission({ orderID: order.id, requestID: request.id }),
  );

  const operationTimeDayjs = reportSubmission?.operationTime
    ? itechDateTimeToDayjs(reportSubmission?.operationTime)
    : null;

  const errorRadiologyDateTime = useAppSelector(
    selectErrorRadiologyDateTime({ orderID: order.id, requestID: request.id }),
  );
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(order.id));
  const { checkValidationApprovedTime, checkValidationOperationTime } =
    useOrderValidationDatetime({
      order,
      request,
    });
  const expectedDateTime = useExpectedDateTime({
    orderID: order.id,
    request,
    isDisabledField: !isEditable,
  });
  /**
   * Thay đổi thời gian duyệt,
   * Cần check đồng thời thời gian duyệt mới, thời gian thực hiện có thỏa mãn điều kiện hay không,
   * lưu thời gian thời gian duyệt mới vào store
   */
  const onChangeApproveDateTime = (
    newValue: Dayjs | null,
    currentValue: Dayjs | null,
  ) => {
    const formatDayjsToDateTimeString = formatDateTime(newValue);

    if (order?.id && request?.id && formatDayjsToDateTimeString !== INVALID_DATE) {
      checkValidationApprovedTime(newValue, operationTimeDayjs);
      checkValidationOperationTime(operationTimeDayjs, newValue);
      dispatch(
        setRadiologyReportSubmissionData({
          orderID: order?.id,
          requestID: request?.id,
          approvedTime: formatDayjsToDateTimeString,
        }),
      );
    }
  };

  return (
    <RadiologyDateTimePicker
      onChange={onChangeApproveDateTime}
      value={expectedDateTime}
      error={errorRadiologyDateTime?.errorApprovedTime}
      disabled={!isEditable}
      label={translate.resources.order.approvedTime()}
    />
  );
};
