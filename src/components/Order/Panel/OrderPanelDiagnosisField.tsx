import { styled } from '@mui/material';
import React, { FC } from 'react';

import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import OrderInfoTypography from './OrderInfoTypography';

type OrderPanelDiagnosisFieldProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
};

const OrderPanelDiagnosisField: FC<OrderPanelDiagnosisFieldProps> = (props) => {
  const { order, request } = props;
  const diagnosisText = order?.diagnosis
    ? `${request?.icdCode ?? ''} ${order?.diagnosis}`
    : '';
  return (
    <OrderInfoTypography isEllipsis title={`${diagnosisText}`}>
      <StyledIcdCode>{request?.icdCode ?? ''}</StyledIcdCode>
      {order?.diagnosis ?? ''}
    </OrderInfoTypography>
  );
};

export default OrderPanelDiagnosisField;

const StyledIcdCode = styled('span')`
  color: ${(props) => props.theme.pacs?.customColors.text.label};
  margin-right: ${(props) => props.theme.spacing(0.5)};
`;
