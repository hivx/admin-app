import dayjs from 'dayjs';
import React, { FC } from 'react';

import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateToDayjs } from '@/utils/dateUtils';

import OrderInfoTypography from './OrderInfoTypography';

type OrderPanelBirthYearFieldProps = {
  order?: IOrderDTO;
};

const OrderPanelBirthYearField: FC<OrderPanelBirthYearFieldProps> = (props) => {
  const { order } = props;
  //   const currentYear = dayjs().year();
  const yearOfBirth = order
    ? itechDateToDayjs(order.patient?.birthDate || '')?.format(DISPLAY_FORMAT.year)
    : '';
  return (
    <OrderInfoTypography title={`${yearOfBirth}`}>{yearOfBirth}</OrderInfoTypography>
  );
};

export default OrderPanelBirthYearField;
