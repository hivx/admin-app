import { styled } from '@mui/material';
import React, { FC } from 'react';

import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useTranslate } from '@/hooks';
import { IOrderRequestDTO } from '@/types/dto';

type CreateUpdateConsumableContentProps = {
  request: IOrderRequestDTO;
};
/**
 * Content của Modal Cập nhật vật tư tiêu hao
 */
export const CreateUpdateConsumableContent: FC<CreateUpdateConsumableContentProps> = ({
  request,
}) => {
  const translate = useTranslate();

  return (
    <StyledConsumableContent>
      <OrderInfoField
        Label={
          <OrderInfoTypography title={translate.resources.procedure.title()}>
            {translate.resources.procedure.title()}
          </OrderInfoTypography>
        }
        FieldValue={
          <OrderInfoTypography title={request?.procedure?.name ?? ''}>
            {request?.procedure?.name}
          </OrderInfoTypography>
        }
        valueXS={10}
      />
      <div>{/* <CreateUpdateConsumableTable requestID={request.id} /> */}</div>
    </StyledConsumableContent>
  );
};

const StyledConsumableContent = styled('div')`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 0.5fr 2fr;
  gap: ${(props) => props.theme.spacing(1)};
`;
