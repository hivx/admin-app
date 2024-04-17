import { Divider, styled } from '@mui/material';
import { ComponentProps, FC } from 'react';

import { OrderModalityEditableField } from '@/components/Order/OrderModalityEditableField';
import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import OrderPanelAgeField from '@/components/Order/Panel/OrderPanelAgeField';
import OrderPanelGenderField from '@/components/Order/Panel/OrderPanelGenderField';
import OrderPanelInpatientField from '@/components/Order/Panel/OrderPanelInpatientField';
import {
  OrderPanelRequest,
  styleOrderRequest,
} from '@/components/Order/Panel/OrderPanelRequest';
import { useTranslate } from '@/hooks';
import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

type OrderInfomationFieldsProps = {
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
 * Các trường trong màn Thông tin ca chụp
 */
export const OrderInfomationFields: FC<OrderInfomationFieldsProps> = (props) => {
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
    <OrderInfomationFieldsContainer>
      <OrderInfomationFieldsMain>
        <OrderInfoField
          Label={
            <OrderInfoTypography
              title={translate.resources.order.patient.fullname.long()}
            >
              {translate.resources.order.patient.fullname.long()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography width="150px" title={order?.patient?.fullname ?? ''}>
              {order?.patient?.fullname}
            </OrderInfoTypography>
          }
          labelXS={labelXSTowColumnInfo}
        />

        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.patient.pid.long()}>
              {translate.resources.order.patient.pid.long()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderInfoTypography>{order?.patient?.pid || ''}</OrderInfoTypography>
          }
          labelXS={labelXSTowColumnInfo}
        />

        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.patient.age()}>
              {translate.resources.patient.age()}
            </OrderInfoTypography>
          }
          FieldValue={<OrderPanelAgeField order={order} />}
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
          FieldValue={<OrderPanelInpatientField order={order} />}
          labelXS={labelXSTowColumnInfo}
        />
        <Divider />
        {/**
         * row 2
         */}
        <OrderInfoField
          Label={
            <OrderInfoTypography title={translate.resources.order.requestedDate.short()}>
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
            <OrderInfoTypography title={translate.resources.order.accessionNumber.long()}>
              {translate.resources.order.accessionNumber.long()}
            </OrderInfoTypography>
          }
          FieldValue={<OrderInfoTypography>{order?.accessionNumber}</OrderInfoTypography>}
          labelXS={labelXSTowColumnInfo}
        />

        <OrderInfoField
          Label={
            <OrderInfoTypography
              title={translate.resources.order.requestedDepartment.short()}
            >
              {translate.resources.order.requestedDepartment.short()}
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
        <Divider />
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
                : ''}
            </OrderInfoTypography>
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
            <OrderInfoTypography title={translate.resources.modality.title()}>
              {translate.resources.modality.title()}
            </OrderInfoTypography>
          }
          FieldValue={
            <OrderModalityEditableField
              order={order}
              readonly={readonly}
              request={request}
            />
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
            FieldValue={
              <OrderInfoTypography isEllipsis={false} title={order?.diagnosis ?? ''}>
                {order?.diagnosis || ''}
              </OrderInfoTypography>
            }
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
      </OrderInfomationFieldsMain>
    </OrderInfomationFieldsContainer>
  );
};

const OrderInfomationFieldsContainer = styled('div')`
  height: 100%;
  width: 100%;
`;

const OrderInfomationFieldsMain = styled('div')`
  width: 100%;
  display: grid;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1)};
`;

const StyledFourthRow = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${(props) => props.theme.spacing(0.5)};
  width: 100%;
`;
