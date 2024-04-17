import { styled } from '@mui/material';
import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import OrderInfoField from '../Panel/OrderInfoField';
import OrderInfoTypography from '../Panel/OrderInfoTypography';
type BookmarkOrderInfoProps = {
  order: IOrderDTO;
};

const BookmarkOrderInfo: FC<BookmarkOrderInfoProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  return (
    <StyledBookmarkOrderInfoContainer>
      <OrderInfoField
        Label={
          <OrderInfoTypography title={translate.resources.order.patient.fullname.short()}>
            {translate.resources.order.patient.fullname.short()}
          </OrderInfoTypography>
        }
        FieldValue={<OrderInfoTypography>{order.patient?.fullname}</OrderInfoTypography>}
        labelXS={4}
      />
      <OrderInfoField
        Label={
          <OrderInfoTypography title={translate.resources.order.patient.pid.short()}>
            {translate.resources.order.patient.pid.short()}
          </OrderInfoTypography>
        }
        FieldValue={<OrderInfoTypography>{order.patient?.pid}</OrderInfoTypography>}
        labelXS={4}
      />
      <OrderInfoField
        Label={
          <OrderInfoTypography title={translate.resources.order.modalityType.long()}>
            {translate.resources.order.modalityType.long()}
          </OrderInfoTypography>
        }
        FieldValue={<OrderInfoTypography>{order.modalityType}</OrderInfoTypography>}
        labelXS={4}
      />
      <OrderInfoField
        Label={
          <OrderInfoTypography title={translate.resources.order.requestedDate.long()}>
            {translate.resources.study.studyDatetime()}
          </OrderInfoTypography>
        }
        FieldValue={
          <OrderInfoTypography>
            {itechDateTimeToDayjs(order.study?.studyTime ?? '')?.format(
              DISPLAY_FORMAT.dateTimeNoSecond,
            )}
          </OrderInfoTypography>
        }
        labelXS={4}
      />
    </StyledBookmarkOrderInfoContainer>
  );
};

export default BookmarkOrderInfo;

const StyledBookmarkOrderInfoContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: ${(props) => props.theme.spacing()};
`;
