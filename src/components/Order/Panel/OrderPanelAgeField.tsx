import React, { FC } from 'react';

import { getPatientAge } from '@/lib/dataHelper/radiologyReport/getPatientAge';
import { IOrderDTO } from '@/types/dto';

import OrderInfoTypography from './OrderInfoTypography';

type OrderPanelAgeFieldProps = {
  order?: IOrderDTO;
};

const OrderPanelAgeField: FC<OrderPanelAgeFieldProps> = (props) => {
  const { order } = props;
  /**
   * This year - birth of year => age patient
   */
  // const agePatient = currentYear - parseInt(yearOfBirth ?? '');
  const agePatient = getPatientAge(order?.patient?.birthDate || '');
  return <OrderInfoTypography title={`${agePatient}`}>{agePatient}</OrderInfoTypography>;
};

export default OrderPanelAgeField;
