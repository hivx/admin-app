import { Divider, styled } from '@mui/material';
import { ComponentProps, FC } from 'react';

import { useTranslate } from '@/hooks';
import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import OrderInfoField from '../../Panel/OrderInfoField';
import OrderInfoTypography from '../../Panel/OrderInfoTypography';
import OrderPanelAgeField from '../../Panel/OrderPanelAgeField';
import OrderPanelBirthYearField from '../../Panel/OrderPanelBirthYearField';
import OrderPanelDiagnosisField from '../../Panel/OrderPanelDiagnosisField';
import OrderPanelGenderField from '../../Panel/OrderPanelGenderField';
import OrderPanelInpatientField from '../../Panel/OrderPanelInpatientField';
import { OrderPanelRequest, styleOrderRequest } from '../../Panel/OrderPanelRequest';

type OrderDetailedInfoDynamicPanelProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  currentActiveReportID?: IRadiologyReportDTO['id'];
  // setRequestID: ReturnType<typeof useOrderDynamicSidepanelData>['setRequestID'];
  // setReportID: ReturnType<typeof useOrderDynamicSidepanelData>['setRequestID'];
  onRequestChanged?: ComponentProps<typeof OrderPanelRequest>['onRequestChanged'];
  onReportChanged?: ComponentProps<typeof OrderPanelRequest>['onReportChanged'];
  /**
   * If true, enable edit order info for some fields
   */
  readonly?: boolean;
};

/**
 * Columns must have the same label ratio to align text
 */

// column has label ratio = 4
const COL_LABEL_RATIO_4 = 4;

// column  has label ratio = 2
const COL_LABEL_RATIO_2 = 3;

/**
 * Header has 2 rows stacked vertically --> Use Stack
 * Each row has 2 small columns and 1 big columns --> Use Grid
 */
export const OrderDetailedInfoDynamicPanel: FC<OrderDetailedInfoDynamicPanelProps> = (
  props,
) => {
  const {
    order,
    request,
    currentActiveReportID,
    readonly,
    onReportChanged,
    onRequestChanged,
  } = props;
  const translate = useTranslate();
  const labelXSTowColumnInfo = order ? COL_LABEL_RATIO_4 : 6;

  return (
    <OrderDetailedInfoDynamicPanelContainer>
      <OrderDetailedInfoDynamicPanelMain>
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
              <OrderInfoTypography width={'100%'} title={order?.patient?.fullname ?? ''}>
                {order?.patient?.fullname}
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
            FieldValue={
              <OrderInfoTypography>{order?.patient?.pid || ''}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />

          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.birthYear()}>
                {translate.resources.patient.birthYear()}
              </OrderInfoTypography>
            }
            FieldValue={<OrderPanelBirthYearField order={order} />}
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.patient.gender()}>
                {translate.resources.patient.gender()}
              </OrderInfoTypography>
            }
            FieldValue={<OrderPanelGenderField gender={order?.patient?.gender} />}
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography
                title={translate.resources.order.insuranceNumber.short()}
              >
                {translate.resources.order.insuranceNumber.short()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography title={translate.resources.patient.gender()}>
                {order?.insuranceNumber}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.inpatient()}>
                {translate.resources.order.inpatient()}
              </OrderInfoTypography>
            }
            FieldValue={
              typeof order?.inpatient != 'undefined' ? (
                <OrderPanelInpatientField order={order} />
              ) : (
                ''
              )
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
              <OrderInfoTypography
                title={translate.resources.order.requestedDate.short()}
              >
                {translate.resources.order.requestedDate.short()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>
                {order?.requestedTime
                  ? itechDateTimeToDayjs(order?.requestedTime)?.format(
                      DISPLAY_FORMAT.dateTimeNoSecond,
                    )
                  : ''}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography
                title={translate.resources.order.accessionNumber.short()}
              >
                {translate.resources.order.accessionNumber.short()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.accessionNumber}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />

          <OrderInfoField
            Label={
              <OrderInfoTypography
                title={translate.resources.order.requestedDepartment.long()}
              >
                {translate.resources.order.requestedDepartment.long()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography width="150px">
                {order?.requestedDepartment?.name}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />

          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.encounterNumber()}>
                {translate.resources.order.encounterNumber()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography width="150px">
                {order?.encounterNumber ?? ''}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography
                title={translate.resources.order.referringPhysician.short()}
              >
                {translate.resources.order.referringPhysician.short()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>
                {order?.referringPhysician?.fullname}
              </OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.urgent.short()}>
                {translate.resources.order.urgent.short()}
              </OrderInfoTypography>
            }
            FieldValue={
              typeof order?.urgent != 'undefined' ? (
                <OrderInfoTypography>
                  {order?.urgent ? 'Có' : 'Không'}
                </OrderInfoTypography>
              ) : (
                '-'
              )
            }
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.modalityType.long()}>
                {translate.resources.order.modalityType.long()}
              </OrderInfoTypography>
            }
            FieldValue={<OrderInfoTypography>{order?.modalityType}</OrderInfoTypography>}
            labelXS={labelXSTowColumnInfo}
          />
          <OrderInfoField
            Label={
              <OrderInfoTypography
                title={translate.resources.study.bodyPartExamined.title()}
              >
                {translate.resources.study.bodyPartExamined.title()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderInfoTypography>{order?.study?.bodyPartExamined}</OrderInfoTypography>
            }
            labelXS={labelXSTowColumnInfo}
          />
        </StyledSecondRow>
        <Divider />
        {/**
         * Row 3
         */}
        <StyledFourthRow>
          <OrderInfoField
            Label={
              <OrderInfoTypography title={translate.resources.order.diagnosis.long()}>
                {translate.resources.order.diagnosis.short()}
              </OrderInfoTypography>
            }
            FieldValue={<OrderPanelDiagnosisField order={order} request={request} />}
            labelXS={COL_LABEL_RATIO_2}
          />
          <OrderInfoField
            sx={styleOrderRequest}
            Label={
              <OrderInfoTypography title={translate.resources.order.requests()}>
                {translate.resources.order.requests()}
              </OrderInfoTypography>
            }
            FieldValue={
              <OrderPanelRequest
                order={order}
                request={request}
                currentActiveReportID={currentActiveReportID}
                onReportChanged={onReportChanged}
                onRequestChanged={onRequestChanged}
              />
            }
            labelXS={COL_LABEL_RATIO_2}
          />
        </StyledFourthRow>
      </OrderDetailedInfoDynamicPanelMain>
    </OrderDetailedInfoDynamicPanelContainer>
  );
};

const OrderDetailedInfoDynamicPanelContainer = styled('div')`
  height: 100%;
  width: 100%;
`;

const OrderDetailedInfoDynamicPanelMain = styled('div')`
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

const StyledThirdRow = styled(StyledFirstRow)``;

const StyledFourthRow = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${(props) => props.theme.spacing(0.5)};
  width: 100%;
`;
