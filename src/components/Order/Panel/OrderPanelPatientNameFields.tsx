import dayjs from 'dayjs';
import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateToDayjs } from '@/utils/dateUtils';

import OrderInfoTypography from './OrderInfoTypography';

type OrderPanelPatientNameFieldsProps = {
  order?: IOrderDTO;
};

const OrderPanelPatientNameFields: FC<OrderPanelPatientNameFieldsProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  const currentYear = dayjs().year();
  const yearOfBirth = order
    ? itechDateToDayjs(order.patient?.birthDate || '')?.format(DISPLAY_FORMAT.year)
    : '';
  /**
   * This year - birth of year => age patient
   */
  const agePatient = currentYear - parseInt(yearOfBirth ?? '');

  const content = order
    ? `${order.patient?.fullname} (${
        order.patient?.gender &&
        translate.messages.gender({
          gender: order.patient?.gender,
        })
      }
    - ${agePatient}T)`
    : '-';
  return <OrderInfoTypography title={content}>{content}</OrderInfoTypography>;
};

export default OrderPanelPatientNameFields;
