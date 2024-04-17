import { getCurrentDateTime, itechDateTimeToDayjs } from '@/utils/dateUtils';

export const isValidTimeInForm = ({
  operationTime,
  approvedTime,
  requestedTime,
}: {
  operationTime?: string;
  approvedTime?: string;
  requestedTime?: string;
}) => {
  const operationTimeDayjs = itechDateTimeToDayjs(operationTime ?? null);
  const approvedTimeDayjs = approvedTime
    ? itechDateTimeToDayjs(approvedTime)
    : getCurrentDateTime();
  const requestedTimeDayjs = itechDateTimeToDayjs(requestedTime ?? null);

  // eslint-disable-next-line no-console
  console.info(
    `%cTIME operationTimeDayjs %c${operationTime} ${operationTimeDayjs}`,
    'color:violet',
  );
  // eslint-disable-next-line no-console
  console.info(
    `%cTIME approvedTimeDayjs %c${approvedTime} ${approvedTimeDayjs}`,
    'color:violet',
  );
  // eslint-disable-next-line no-console
  console.info(
    `%cTIME requestedTimeDayjs %c${requestedTime} ${requestedTimeDayjs}`,
    'color:violet',
  );

  if (
    requestedTimeDayjs?.isBefore(operationTimeDayjs) &&
    operationTimeDayjs?.isBefore(approvedTimeDayjs)
  ) {
    return true;
  }
  return false;
};
