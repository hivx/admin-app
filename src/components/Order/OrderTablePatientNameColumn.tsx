import { Typography, styled } from '@mui/material';
import { FC } from 'react';

import { IOrderDTO, ORDER_CREATION_TYPE } from '@/types/dto';
type OrderTablePatientNameColumnProps = {
  order: IOrderDTO;
};

const OrderTablePatientNameColumn: FC<OrderTablePatientNameColumnProps> = (props) => {
  const { order } = props;

  /**
   * Hiển thị  ? + tên bệnh nhân  với creationType là TAG
   */
  const patientName = `${order.creationType === ORDER_CREATION_TYPE.TAG ? '?' : ''} ${
    order.patient?.fullname
  } `;
  return (
    <StyledPatientName title={patientName ?? ''} variant="body2">
      {patientName}
    </StyledPatientName>
  );
};

export default OrderTablePatientNameColumn;

const StyledPatientName = styled(Typography)``;
