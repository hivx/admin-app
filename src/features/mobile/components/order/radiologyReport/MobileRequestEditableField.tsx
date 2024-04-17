import { styled } from '@mui/material';
import React, { FC } from 'react';

import { OrderRequestEditableField } from '@/components/Order/OrderRequestEditableField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  selectRadiologyReportIsEditable,
  setCurrentRequestID,
} from '@/stores/OrderRadiology';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

type MobileRequestEditableFieldProps = {
  order: IOrderDTO;
  request?: IOrderRequestDTO;
};
/**
 * Trường chọn dịch vụ chụp
 * Màn viết KQ
 */
export const MobileRequestEditableField: FC<MobileRequestEditableFieldProps> = ({
  order,
  request,
}) => {
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const dispatch = useAppDispatch();
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(order.id));
  const handleRequestChange = (newRequest: IOrderRequestDTO) => {
    if (orderID) {
      dispatch(setCurrentRequestID({ orderID, requestID: newRequest.id }));
    }
  };
  return (
    <StyledMobileRequestEditWrapper>
      <OrderInfoTypography>{translate.resources.procedure.title()}</OrderInfoTypography>
      <OrderRequestEditableField
        order={order}
        request={request}
        onRequestChange={handleRequestChange}
        readonly={!isEditable}
      />
    </StyledMobileRequestEditWrapper>
  );
};
const StyledMobileRequestEditWrapper = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(100px, 0.5fr) 3fr;
  align-items: center;
`;
