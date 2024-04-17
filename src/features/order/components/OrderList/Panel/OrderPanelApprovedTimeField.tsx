import { Grid, Stack } from '@mui/material';
import React, { FC } from 'react';

import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useTranslate } from '@/hooks';
import { IOrderRequestDTO } from '@/types/dto';
import { itechDateTimeToDayjs, DISPLAY_FORMAT } from '@/utils/dateUtils';

type OrderPanelApprovedTimeFieldProps = {
  request?: IOrderRequestDTO;
};
const OrderPanelApprovedTimeField: FC<OrderPanelApprovedTimeFieldProps> = (props) => {
  const { request } = props;
  const translate = useTranslate();

  return (
    <OrderInfoField
      Label={
        <OrderInfoTypography title={translate.resources.report.reportApprovedDate.long()}>
          {translate.resources.report.reportApprovedDate.short()}
        </OrderInfoTypography>
      }
      FieldValue={
        // BS Duyet field is in the same block as report approved time field
        <Stack direction="row" spacing={2} display="flex" alignItems="center">
          <OrderInfoTypography width="100%">
            {request?.finalApprovedTime
              ? itechDateTimeToDayjs(request?.finalApprovedTime)?.format(
                  DISPLAY_FORMAT.dateTimeNoSecond,
                )
              : '-'}
          </OrderInfoTypography>
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.reporter.long()}>
                {translate.resources.order.reporter.short()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>
                {request?.finalApprover?.fullname ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={6}
          />
        </Stack>
      }
      labelXS={2}
    />
  );
};

export default OrderPanelApprovedTimeField;
