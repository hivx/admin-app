import { styled } from '@mui/material';
import { ComponentProps, FC } from 'react';

import { useTranslate } from '@/hooks';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { OrderModalityEditableField } from '../OrderModalityEditableField';
import { OrderRequestEditableField } from '../OrderRequestEditableField';

import OrderInfoField from './OrderInfoField';
import OrderInfoTypography from './OrderInfoTypography';
import OrderPanelPatientNameFields from './OrderPanelPatientNameFields';

type OrderDetailedInfoProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  /**
   * If true, enable edit order info for some fields
   */
  readonly?: boolean;
  onRequestChange?: ComponentProps<typeof OrderRequestEditableField>['onRequestChange'];
};

/**
 * Columns must have the same label ratio to align text
 */

// column has label ratio = 4
const COL_LABEL_RATIO_4 = 4;

// column  has label ratio = 2
const COL_LABEL_RATIO_2 = 2;

/**
 * Header has 2 rows stacked vertically --> Use Stack
 * Each row has 2 small columns and 1 big columns --> Use Grid
 */
const OrderDetailedInfo: FC<OrderDetailedInfoProps> = (props) => {
  const { order, request, readonly, onRequestChange } = props;
  const translate = useTranslate();
  return (
    <OrderDetailedInfoContainer>
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
          FieldValue={<OrderPanelPatientNameFields order={order} />}
          labelXS={COL_LABEL_RATIO_4}
        />
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.patient.pid.long()}>
              {translate.resources.order.patient.pid.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>{order?.patient?.pid || '-'}</OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO_4}
        />
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.requestedDate.long()}>
              {translate.resources.order.requestedDate.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>
              {order
                ? itechDateTimeToDayjs(order?.requestedTime)?.format(
                    DISPLAY_FORMAT.dateTimeNoSecond,
                  )
                : '-'}
            </OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO_4}
        />
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.accessionNumber.long()}>
              {translate.resources.order.accessionNumber.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>{order?.accessionNumber || '-'}</OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO_4}
        />
      </StyledFirstRow>
      {/**
       * row 2
       */}
      <StyledSecondRow>
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.study.studyDatetime()}>
              {translate.resources.study.studyDatetime()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>
              {order?.study?.studyTime
                ? itechDateTimeToDayjs(order?.study?.studyTime)?.format(
                    DISPLAY_FORMAT.dateTimeNoSecond,
                  )
                : '-'}
            </OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO_4}
        />
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.modality()}>
              {translate.resources.order.modality()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderModalityEditableField
              order={order}
              readonly={readonly}
              request={request}
            />
          }
          labelXS={COL_LABEL_RATIO_4}
        />

        <OrderInfoField
          Label={
            <OrderInfoTypography
              title={translate.resources.report.reportApprovedDate.long()}
            >
              {translate.resources.report.reportApprovedDate.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography width="100%">
              {request?.finalApprovedTime
                ? itechDateTimeToDayjs(request?.finalApprovedTime)?.format(
                    DISPLAY_FORMAT.dateTimeNoSecond,
                  )
                : '-'}
            </OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO_4}
        />
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
          labelXS={COL_LABEL_RATIO_4}
        />
      </StyledSecondRow>
      {/**
       * Row 3
       */}
      <StyledThirdRow>
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.diagnosis.long()}>
              {translate.resources.order.diagnosis.short()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography title={order?.diagnosis ?? ''} width="80%">
              {order?.diagnosis || '-'}
            </OrderInfoTypography>
          }
          labelXS={COL_LABEL_RATIO_2}
        />
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.requests()}>
              {translate.resources.order.requests()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderRequestEditableField
              order={order}
              request={request}
              onRequestChange={onRequestChange}
            />
          }
          labelXS={COL_LABEL_RATIO_2}
        />
      </StyledThirdRow>
    </OrderDetailedInfoContainer>
  );
};

export default OrderDetailedInfo;

const OrderDetailedInfoContainer = styled('div')`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 100%;
  gap: ${(props) => props.theme.spacing(1)};
`;

const StyledFirstRow = styled('div')`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
`;

const StyledSecondRow = styled(StyledFirstRow)``;

const StyledThirdRow = styled('div')`
  display: grid;
  grid-template-columns: 50% 50%;
`;
