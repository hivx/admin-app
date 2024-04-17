import { Stack, styled } from '@mui/material';
import React, { FC } from 'react';

import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

const LONG_FIELD_LABEL_RATIO = 5;
type InfoStudyFieldsProps = {
  study?: IOrderDTO['study'];
};
const InfoStudyFields: FC<InfoStudyFieldsProps> = (props) => {
  const { study } = props;
  const translate = useTranslate();
  return (
    <Stack spacing={1}>
      <OrderInfoField
        Label={<OrderInfoTypography>{'ID'}</OrderInfoTypography>}
        FieldValue={<OrderInfoTypography>{study?.id ?? '-'}</OrderInfoTypography>}
        labelXS={LONG_FIELD_LABEL_RATIO}
      />
      <div></div>
      <Stack direction="row">
        <StyledColumnInfoFields>
          {/**
           * Tên bệnh nhân
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.fullName()}>
                {translate.resources.patient.fullName()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={study?.patientName ?? '-'}>
                {study?.patientName ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />

          {/**
           * Giới tính
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.gender()}>
                {translate.resources.patient.gender()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>
                {study?.gender
                  ? translate.messages.gender({
                      gender: study?.gender,
                    })
                  : '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
          {/**
           * Study Date time
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.studyDatetime()}>
                {translate.resources.study.studyDatetime()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography
                title={
                  study?.studyTime
                    ? itechDateTimeToDayjs(study?.studyTime)?.format(
                        DISPLAY_FORMAT.dateTimeNoSecond,
                      )
                    : '-'
                }
              >
                {study?.studyTime
                  ? itechDateTimeToDayjs(study?.studyTime)?.format(
                      DISPLAY_FORMAT.dateTimeNoSecond,
                    )
                  : '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />

          {/**
           * Số studyIUID
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.numStudyIUID.long()}>
                {translate.resources.study.numStudyIUID.long()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={study?.studyInstanceUID ?? '-'}>
                {study?.studyInstanceUID ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
          {/**
           * Số ảnh
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography>
                {translate.resources.study.numOfImages()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{study?.numOfImages ?? '-'}</OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
        </StyledColumnInfoFields>
        <StyledColumnInfoFields>
          {/**
           * Mã bệnh nhân
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.id()}>
                {translate.resources.patient.id()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={study?.pid ?? '-'}>
                {study?.pid ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />

          {/**
           * Loại máy
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography>
                {translate.resources.contentGroup.modalityType()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{study?.modalityType ?? '-'}</OrderInfoTypography>
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
              <OrderInfoTypography title={study?.accessionNumber ?? '-'}>
                {study?.accessionNumber ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />

          {/**
           * Máy chụp
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.modality.title()}>
                {translate.resources.modality.title()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={study?.modality?.name ?? '-'}>
                {study?.modality?.name ?? '-'}
              </OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />

          {/**
           * Số series
           */}
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.numOfSeries()}>
                {translate.resources.study.numOfSeries()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{study?.numOfSeries ?? '-'}</OrderInfoTypography>
            }
            labelXS={LONG_FIELD_LABEL_RATIO}
          />
        </StyledColumnInfoFields>
      </Stack>
    </Stack>
  );
};

export default InfoStudyFields;

const StyledColumnInfoFields = styled(Stack)`
  gap: ${(props) => props.theme.spacing(2)};
  width: 50%;
`;
