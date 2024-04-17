import { Grid, Stack } from '@mui/material';
import { FC } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormDateTimePicker } from '@/components/Form/MyFormDateTimePicker';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useCurrentOrderID } from '@/features/order';
import { useTranslate } from '@/hooks';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

export type IApproveWithTimeFormFields = {
  approvedDate?: string;
  approvedHour?: string;
};

export type ApproveWithTimeFormFieldsProps =
  IFormControlInputProps<IApproveWithTimeFormFields>;

/**
 * Approved time field for desktop
 */
export const DesktopApproveTimeFormField: FC<ApproveWithTimeFormFieldsProps> = (
  props,
) => {
  const { watch, control } = props;
  const orderID = useCurrentOrderID();
  const { data: order } = useGetOneOrderQuery({ id: orderID });

  const translate = useTranslate();
  return (
    <Stack spacing={2}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.requestedDate.long()}>
                {translate.resources.order.requestedDate.long()}
              </OrderInfoTypography>
            }
            FieldValue={
              order?.requestedTime
                ? itechDateTimeToDayjs(order?.requestedTime)?.format(
                    DISPLAY_FORMAT.dateTimeNoSecond,
                  )
                : '-'
            }
          />
        </Grid>
        <Grid item xs={6}>
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.studyDatetime()}>
                {translate.resources.study.studyDatetime()}
              </OrderInfoTypography>
            }
            FieldValue={
              order?.study?.studyTime
                ? itechDateTimeToDayjs(order?.study?.studyTime)?.format(
                    DISPLAY_FORMAT.dateTimeNoSecond,
                  )
                : '-'
            }
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <StyledDivCenterChildren>
            <OrderInfoField
              Label={
                <OrderInfoTypography
                  title={translate.resources.report.reportApprovedDate.long()}
                >
                  {translate.resources.report.reportApprovedDate.long()}
                </OrderInfoTypography>
              }
              labelXS={12}
            />
          </StyledDivCenterChildren>
        </Grid>
        <Grid item xs={10}>
          <Stack direction={'row'} spacing={1}>
            <MyFormDateTimePicker
              name="approvedDate"
              type="date"
              watch={watch}
              label={translate.common.selectDate()}
              control={control}
            />
            <MyFormDateTimePicker
              name="approvedHour"
              type="time"
              watch={watch}
              label={translate.common.selectTime()}
              control={control}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
