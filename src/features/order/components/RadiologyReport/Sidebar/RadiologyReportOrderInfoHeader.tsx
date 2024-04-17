import { Grid, Stack, styled } from '@mui/material';
import React, { FC } from 'react';

import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import OrderPanelPatientNameFields from '@/components/Order/Panel/OrderPanelPatientNameFields';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

const COL_WIDTH_RATIO = 3;
const COL_LABEL_RATIO = 5;

type RadiologyReportOrderInfoHeaderProps = {
  order: IOrderDTO;
};
const RadiologyReportOrderInfoHeader: FC<RadiologyReportOrderInfoHeaderProps> = (
  props,
) => {
  const { order } = props;
  const translate = useTranslate();
  return (
    <StyledOrderInfoHeaderMain>
      <Grid item xs={COL_WIDTH_RATIO}>
        <OrderInfoField
          Label={
            <OrderInfoTypography
              title={translate.resources.order.patient.fullname.short()}
            >
              {translate.resources.order.patient.fullname.short()}
            </OrderInfoTypography>
          }
          FieldValue={<OrderPanelPatientNameFields order={order} />}
          labelXS={COL_LABEL_RATIO}
        />
      </Grid>
      <Grid item xs={COL_WIDTH_RATIO}>
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.patient.pid.short()}>
              {translate.resources.order.patient.pid.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>{order?.patient?.pid ?? '-'}</OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO}
        />
      </Grid>
      <Grid item xs={COL_WIDTH_RATIO}>
        <OrderInfoField
          Label={
            <OrderInfoTypography
              title={translate.resources.order.accessionNumber.short()}
            >
              {translate.resources.order.accessionNumber.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>{order?.accessionNumber ?? '-'}</OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO}
        />
      </Grid>
      <Grid item xs={COL_WIDTH_RATIO}>
        <OrderInfoField
          Label={
            <OrderInfoTypography
              title={translate.resources.order.requestedDepartment.short()}
            >
              {translate.resources.order.requestedDepartment.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>
              {order?.requestedDepartment?.code ?? '-'}
            </OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO}
        />
      </Grid>
      <Grid item xs={COL_WIDTH_RATIO}>
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.requestedDate.short()}>
              {translate.resources.order.requestedDate.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>
              {itechDateTimeToDayjs(order?.requestedTime)?.format(
                DISPLAY_FORMAT.dateTimeNoSecond,
              ) ?? '-'}
            </OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO}
        />
      </Grid>
      <Grid item xs={COL_WIDTH_RATIO}>
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.insurance()}>
              {translate.resources.order.insurance()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>
              {order?.insuranceNumber && order?.insuranceExpiredDate
                ? `${order?.insuranceNumber}${itechDateTimeToDayjs(
                    order?.insuranceExpiredDate,
                  )?.format(DISPLAY_FORMAT.date)}`
                : '-'}
            </OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO}
        />
      </Grid>
      <Grid item xs={COL_WIDTH_RATIO}>
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.modalityType.long()}>
              {translate.resources.order.modalityType.long()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>{order?.modalityType ?? '-'}</OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO}
        />
      </Grid>
      <Grid item xs={COL_WIDTH_RATIO}>
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.bodyParts.short()}>
              {translate.resources.order.bodyParts.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>
              {!order?.study?.bodyPartExamined ? '-' : order?.study?.bodyPartExamined}
            </OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO}
        />
      </Grid>
    </StyledOrderInfoHeaderMain>
  );
};

export default RadiologyReportOrderInfoHeader;

const StyledOrderInfoHeaderMain = styled(Stack)`
  ${(props) => props.theme.typography.body2}
  padding: ${(props) => props.theme.spacing(1)};
  gap: ${(props) => props.theme.spacing(1)};
`;
