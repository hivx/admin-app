import { MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { TextWithToolTip } from '@/components/Elements/Tooltip/TextWithToolTip';
import { IOrderDTO, IOrderRequestDTO, IProcedureDTO } from '@/types/dto';

import OrderMenuShell from '../../OrderMenuShell';
type OrderProcedureRequestMenuProps = {
  order: IOrderDTO;
};
export const OrderProcedureRequestMenu: FC<OrderProcedureRequestMenuProps> = (props) => {
  const { order } = props;
  return (
    <OrderMenuShell>
      <div>
        <MenuItem key="null" value={''}>
          &nbsp;
        </MenuItem>
        {order?.requests &&
          order?.requests?.map((item: IOrderRequestDTO) => (
            <MenuItem key={item.id}>
              <TextWithToolTip title={item.procedure?.name ?? ''}>
                {item.procedure?.name ?? ''}
              </TextWithToolTip>
            </MenuItem>
          ))}
      </div>
    </OrderMenuShell>
  );
};
