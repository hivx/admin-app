import { Divider, styled } from '@mui/material';
import { FC } from 'react';

import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';
import {
  DISPLAY_FORMAT,
  itechDateTimeToDayjs,
  itechDateToDayjs,
} from '@/utils/dateUtils';

import OrderInfoField from '../../Panel/OrderInfoField';
import OrderInfoTypography from '../../Panel/OrderInfoTypography';
import OrderPanelGenderField from '../../Panel/OrderPanelGenderField';

type DicomInfoDynamicPanelProps = {
  order?: IOrderDTO;
};

/**
 * Columns must have the same label ratio to align text
 */

// column has label ratio = 4
const COL_LABEL_RATIO_4 = 4;

/**
 * Header has 2 rows stacked vertically --> Use Stack
 * Each row has 2 small columns and 1 big columns --> Use Grid
 */
export const DicomInfoDynamicPanel: FC<DicomInfoDynamicPanelProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  const labelXSTowColumnInfo = order ? COL_LABEL_RATIO_4 : 6;
  return (
    <DicomInfoDynamicPanelContainer>
      <DicomInfoDynamicPanelMain>
        {/* row 1 */}
        <StyledFirstRow>
          <OrderInfoField
            Label={
              <OrderInfoTypography
                title={translate.resources.order.patient.fullname.long()}
              >
                {translate.resources.order.patient.fullname.short()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography width="150px" title={order?.study?.patientName ?? ''}>
                {order?.study?.patientName}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />

          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.patient.pid.long()}>
                {translate.resources.order.patient.pid.short()}
              </OrderInfoTypography>
            }
            FieldValue={<OrderInfoTypography>{order?.study?.pid}</OrderInfoTypography>}
            labelXS={labelXSTowColumnInfo}
          />

          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.birthDate()}>
                {translate.resources.patient.birthDate()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>
                {order?.study?.birthDate
                  ? itechDateToDayjs(order?.study?.birthDate)?.format(DISPLAY_FORMAT.date)
                  : ''}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.gender()}>
                {translate.resources.patient.gender()}
              </OrderInfoTypography>
            }
            FieldValue={<OrderPanelGenderField gender={order?.study?.gender} />}
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.studyDatetime()}>
                {translate.resources.study.studyDatetime()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={translate.resources.study.studyDatetime()}>
                {order?.study?.studyTime
                  ? itechDateTimeToDayjs(order?.study?.studyTime)?.format(
                      DISPLAY_FORMAT.dateTimeNoSecond,
                    )
                  : ''}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.accessionNumber()}>
                {translate.resources.study.accessionNumber()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={translate.resources.study.studyDatetime()}>
                {order?.study?.accessionNumber}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
        </StyledFirstRow>
        <Divider />
        {/**
         * row 2
         */}
        <StyledSecondRow>
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.modalityType.long()}>
                {translate.resources.order.modalityType.long()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.study?.modalityType}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.bodyParts.short()}>
                {translate.resources.order.bodyParts.short()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.study?.bodyPartExamined}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />

          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.numStudyIUID.short()}>
                {translate.resources.study.numStudyIUID.short()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.study?.studyInstanceUID}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.station()}>
                {translate.resources.study.station()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.study?.stationName}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />

          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.modality.aeTitle()}>
                {translate.resources.modality.aeTitle()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.study?.modality?.aeTitle}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.modality.ipAddress()}>
                {translate.resources.modality.ipAddress()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>
                {order?.study?.modality?.ipAddress}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />

          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.numOfSeries()}>
                {translate.resources.study.numOfSeries()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.study?.numOfSeries}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.study.numOfImages()}>
                {translate.resources.study.numOfImages()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.study?.numOfImages}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
        </StyledSecondRow>
      </DicomInfoDynamicPanelMain>
    </DicomInfoDynamicPanelContainer>
  );
};

const DicomInfoDynamicPanelContainer = styled('div')`
  height: 100%;
  width: 100%;
`;

const DicomInfoDynamicPanelMain = styled('div')`
  width: 100%;
  display: grid;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1)};
`;

const StyledFirstRow = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${(props) => props.theme.spacing(1)};
  row-gap: ${(props) => props.theme.spacing(0.5)};
  width: 100%;
`;

const StyledSecondRow = styled(StyledFirstRow)``;
