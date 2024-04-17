import { FormControl, InputLabel, MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { getDisplayProcedureName } from '@/lib/dataHelper/order/getDisplayProcedureName';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import { MySelect, MyTextField } from '../Elements';

import OrderInfoTypography from './Panel/OrderInfoTypography';

type OrderRequestEditableFieldProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  readonly?: boolean;
  onRequestChange?: (newRequest: IOrderRequestDTO) => void;
};
/**
 * Trường chọn Request ở bên phải màn viết kết quả
 * */
export const OrderRequestSelectField: FC<OrderRequestEditableFieldProps> = ({
  onRequestChange,
  order,
  readonly,
  request,
}) => {
  const translate = useTranslate();
  return (order?.requests && order?.requests?.length <= 1) || readonly ? (
    <MyTextField
      label={translate.resources.procedure.title()}
      placeholder={translate.resources.procedure.title()}
      size="small"
      title={
        getDisplayProcedureName(
          order?.insuranceApplied ?? false,
          request?.procedure?.name ?? '',
        ) ?? ''
      }
      fullWidth
      value={
        getDisplayProcedureName(
          order?.insuranceApplied ?? false,
          request?.procedure?.name ?? '',
        ) ?? ''
      }
      disabled={true}
    />
  ) : (
    <FormControl>
      <InputLabel size="small">{translate.resources.procedure.title()}</InputLabel>
      <MySelect
        label={translate.resources.procedure.title()}
        size="small"
        placeholder={translate.resources.procedure.title()}
        value={request?.id ?? 0}
        fullWidth
      >
        {order?.requests?.map((item) => {
          const displayName =
            getDisplayProcedureName(
              order?.insuranceApplied ?? false,
              item?.procedure?.name ?? '',
            ) ?? '';
          return (
            <MenuItem
              key={item.id}
              value={item.id}
              title={displayName}
              onClick={() => onRequestChange && onRequestChange(item)}
            >
              <OrderInfoTypography title={displayName}>{displayName}</OrderInfoTypography>
            </MenuItem>
          );
        })}
      </MySelect>
    </FormControl>
  );
};
