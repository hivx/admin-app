import { styled } from '@mui/material';

import { useGetOneOrderQuery } from '@/api/order';
import { useGetOneOrderRequestQuery } from '@/api/orderRequest';
import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useAppSelector, useTranslate } from '@/hooks';
import { selectCurrentRequestID } from '@/stores/OrderRadiology';

import { useCurrentOrderID } from '../../../../providers/RadiologyReportProvider';

import { ConsumableTable } from './ConsumableTable';

export const ConsumableContent = () => {
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));

  const { data: request } = useGetOneOrderRequestQuery({ orderID, requestID });

  return (
    <StyledConsumableContent>
      <OrderInfoField
        Label={
          <OrderInfoTypography title={translate.resources.procedure.title()}>
            {translate.resources.procedure.title()}
          </OrderInfoTypography>
        }
        valueXS={10}
        FieldValue={
          <OrderInfoTypography title={request?.procedure?.name ?? ''}>
            {request?.procedure?.name}
          </OrderInfoTypography>
        }
      />
      <div>
        <ConsumableTable requestID={requestID} orderID={orderID} />
      </div>
    </StyledConsumableContent>
  );
};

const StyledConsumableContent = styled('div')`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 0.5fr minmax(2fr, 400px);
  gap: ${(props) => props.theme.spacing(1)};
`;
