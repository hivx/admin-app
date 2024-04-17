import { styled } from '@mui/material';
import { FC } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { MyFormDateTimePicker } from '@/components/Form/MyFormDateTimePicker';
import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useCurrentOrderID } from '@/features/order';
import { useTranslate } from '@/hooks';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { ApproveWithTimeFormFieldsProps } from './DesktopApproveTimeFormField';

/**
 * Approved time field for mobile
 */
export const MobileApproveTimeFormFields: FC<ApproveWithTimeFormFieldsProps> = (
  props,
) => {
  const { watch, control } = props;
  const orderID = useCurrentOrderID();
  const { data: order } = useGetOneOrderQuery({ id: orderID });

  const translate = useTranslate();
  return (
    <StyledMobileOrderDateWrapper>
      <OrderInfoField
        Label={
          <OrderInfoTypography title={translate.resources.order.requestedDate.long()}>
            {translate.resources.order.requestedDate.long()}
          </OrderInfoTypography>
        }
        FieldValue={
          order?.requestedTime
            ? itechDateTimeToDayjs(order?.requestedTime)?.format(DISPLAY_FORMAT.dateTime)
            : '-'
        }
        labelXS={4}
      />
      <OrderInfoField
        Label={
          <OrderInfoTypography title={translate.resources.study.studyDatetime()}>
            {translate.resources.study.studyDatetime()}
          </OrderInfoTypography>
        }
        FieldValue={
          order?.study?.studyTime
            ? itechDateTimeToDayjs(order?.study?.studyTime)?.format(
                DISPLAY_FORMAT.dateTime,
              )
            : '-'
        }
        labelXS={4}
      />
      <OrderInfoField
        Label={
          <OrderInfoTypography
            title={translate.resources.report.reportApprovedDate.long()}
          >
            {translate.resources.report.reportApprovedDate.long()}
          </OrderInfoTypography>
        }
        FieldValue={
          <MyFormDateTimePicker
            name="approvedDate"
            type="date"
            watch={watch}
            control={control}
            TextFieldProps={{ size: 'small' }}
          />
        }
        labelXS={4}
      />
      <OrderInfoField
        Label={
          <OrderInfoTypography title={translate.resources.report.reportApprovedTime()}>
            {translate.resources.report.reportApprovedTime()}
          </OrderInfoTypography>
        }
        FieldValue={
          <MyFormDateTimePicker
            name="approvedHour"
            type="time"
            watch={watch}
            control={control}
            TextFieldProps={{ size: 'small' }}
          />
        }
        labelXS={4}
      />
    </StyledMobileOrderDateWrapper>
  );
};

const StyledMobileOrderDateWrapper = styled('div')`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: ${(props) => props.theme.spacing(0.5)};
`;
