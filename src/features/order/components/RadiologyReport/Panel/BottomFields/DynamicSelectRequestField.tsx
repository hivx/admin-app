import { MenuItem, styled } from '@mui/material';
import React, { FC } from 'react';

import { MySelect } from '@/components';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useAppDispatch } from '@/hooks';
import { setCurrentRequestID } from '@/stores/OrderRadiology';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';
type DynamicSelectRequestFieldProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  isQuickReportTab?: boolean;
};
export const DynamicSelectRequestField: FC<DynamicSelectRequestFieldProps> = (props) => {
  const { order, request, isQuickReportTab } = props;
  const dispatch = useAppDispatch();
  const handleRequestChange = (requestID: IOrderRequestDTO['id']) => {
    if (order?.id) {
      dispatch(setCurrentRequestID({ orderID: order.id, requestID }));
    }
  };
  return (order?.requests && order?.requests?.length <= 1) || !isQuickReportTab ? (
    <OrderInfoTypography title={request?.procedure?.name ?? ''}>
      {request?.procedure?.name}
    </OrderInfoTypography>
  ) : (
    <StyledSelectWrapper>
      <MySelect value={request?.id} size="extrasmall" fullWidth sx={{ padding: 0 }}>
        {order?.requests?.map((request) => (
          <MenuItem
            key={request.id}
            value={request.id}
            title={request.procedure?.name ?? ''}
            onClick={() => handleRequestChange(request.id)}
          >
            <OrderInfoTypography title={request?.procedure?.name ?? ''}>
              {request?.procedure?.name}
            </OrderInfoTypography>
          </MenuItem>
        ))}
      </MySelect>
    </StyledSelectWrapper>
  );
};

const StyledSelectWrapper = styled('div')`
  line-height: 1.43;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
