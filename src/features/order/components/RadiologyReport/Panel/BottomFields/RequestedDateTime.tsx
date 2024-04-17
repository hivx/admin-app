import React, { FC } from 'react';

import { MyTextField } from '@/components';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

type RequestedDateTimeProps = {
  order?: IOrderDTO;
};
/**
 * Thời gian chỉ định
 */
export const RequestedDateTime: FC<RequestedDateTimeProps> = ({ order }) => {
  const translate = useTranslate();
  const requestedTime =
    order && order.requestedTime ? itechDateTimeToDayjs(order.requestedTime) : null;

  return (
    <MyTextField
      value={requestedTime?.format(DISPLAY_FORMAT.dateTimeNoSecond)}
      disabled={true}
      label={translate.resources.order.requestedDate.long()}
      size="small"
    />
  );
};
