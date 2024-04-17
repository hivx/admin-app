import { Stack, styled } from '@mui/material';
import React, { FC } from 'react';

import { OrderTableRequestProcedureColumn } from '@/components/Order/OrderTableRequestProcedureColumn';
import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import InfoStudyRequest from './InfoStudyRequest';

const LONG_FIELD_LABEL_RATIO = 5;
const SHORT_FIELDLABEL_RATIO = 2.5;

type InfoRequestFieldsProps = {
  order?: IOrderDTO;
};

const InfoRequestFields: FC<InfoRequestFieldsProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();

  return (
    <>
      {/**
       * Thông tin chỉ định
       */}
      <Stack spacing={2}>
        <Stack direction="row">
          {/**
           * Field ID
           */}
          <OrderInfoField
            Label={<OrderInfoTypography>{'ID'}</OrderInfoTypography>}
            FieldValue={<OrderInfoTypography>{order?.id ?? '-'}</OrderInfoTypography>}
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
          {/**
           * Tạo từ
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.creationType()}>
                {translate.resources.study.creationType()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={order?.creationType ?? '-'}>
                {order?.creationType ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
        </Stack>
        <Stack direction="row">
          {/**
           * Field patient name
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.fullName()}>
                {translate.resources.patient.fullName()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={order?.patient?.fullname ?? '-'}>
                {order?.patient?.fullname ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
          {/**
           * Mã BN
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.id()}>
                {translate.resources.patient.id()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={order?.patient?.pid ?? '-'}>
                {order?.patient?.pid ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
        </Stack>
        <Stack direction="row">
          {/**
           * Field patient gender
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.gender()}>
                {translate.resources.patient.gender()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>
                {order?.patient?.gender
                  ? translate.messages.gender({
                      gender: order?.patient?.gender,
                    })
                  : '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
          {/**
           * Loại máy
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography
                title={translate.resources.contentGroup.modalityType()}
              >
                {translate.resources.contentGroup.modalityType()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.modalityType ?? '-'}</OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
        </Stack>
        <Stack direction="row">
          {/**
           * Thời gian chỉ định
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.requestedDate.long()}>
                {translate.resources.order.requestedDate.long()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography
                title={
                  order?.requestedTime
                    ? itechDateTimeToDayjs(order?.requestedTime)?.format(
                        DISPLAY_FORMAT.dateTimeNoSecond,
                      )
                    : '-'
                }
              >
                {order?.requestedTime
                  ? itechDateTimeToDayjs(order?.requestedTime)?.format(
                      DISPLAY_FORMAT.dateTimeNoSecond,
                    )
                  : '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
          {/**
           * Mã chỉ định
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography
                title={translate.resources.order.accessionNumber.long()}
              >
                {translate.resources.order.accessionNumber.long()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={order?.accessionNumber ?? '-'}>
                {order?.accessionNumber ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
        </Stack>

        <Stack direction="row">
          {/**
           * Chẩn đoán lâm sàng
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography
                title={translate.resources.order.diagnosis.littleShort()}
              >
                {translate.resources.order.diagnosis.littleShort()}
              </OrderInfoTypography>
            }
            FieldValue={
              <StyledOrderInfoFieldOverflow>
                <OrderInfoTypography title={order?.diagnosis ?? '-'}>
                  {order?.diagnosis ?? '-'}
                </OrderInfoTypography>
              </StyledOrderInfoFieldOverflow>
            }
            labelXS={SHORT_FIELDLABEL_RATIO}
          />
        </Stack>

        <Stack direction="row">
          {/**
           * Yêu cầu chụp
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.requests()}>
                {translate.resources.order.requests()}
              </OrderInfoTypography>
            }
            FieldValue={
              order && (
                <StyledOrderInfoFieldOverflow>
                  <OrderInfoTypography>
                    <OrderTableRequestProcedureColumn order={order} />
                  </OrderInfoTypography>
                </StyledOrderInfoFieldOverflow>
              )
            }
            labelXS={SHORT_FIELDLABEL_RATIO}
          />
        </Stack>
      </Stack>
      {/**
       * Thông tin ảnh dicom
       */}
      <InfoStudyRequest />
    </>
  );
};

export default InfoRequestFields;

const StyledOrderInfoFieldOverflow = styled('div')`
  display: grid;
`;
