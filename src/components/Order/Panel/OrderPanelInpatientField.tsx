import React, { FC } from 'react';

import { IOrderDTO } from '@/types/dto';

import OrderInfoTypography from './OrderInfoTypography';

type OrderPanelInpatientFieldProps = {
  order?: IOrderDTO;
};

const OrderPanelInpatientField: FC<OrderPanelInpatientFieldProps> = (props) => {
  const { order } = props;
  const inpatient = order?.inpatient ? 'Có' : 'Không';
  return <OrderInfoTypography title={`${inpatient}`}>{inpatient}</OrderInfoTypography>;
};

export default OrderPanelInpatientField;
