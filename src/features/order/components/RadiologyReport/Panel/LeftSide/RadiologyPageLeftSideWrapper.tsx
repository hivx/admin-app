import { Stack, styled } from '@mui/material';
import { FC } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { useGetOneOrderRequestQuery } from '@/api/orderRequest';
import { MyTextField } from '@/components/Elements';
import { CreateUpdateConsumableTable } from '@/components/Order/Consumable/CreateUpdateConsumableTable';
import { OrderRequestSelectField } from '@/components/Order/OrderRequestSelectField';
import { ConnectedRadiologyModalitySelectForm } from '@/components/Order/Panel/ModalitySelectForm';
import { ConnectedOperatorAutoCompleteForm } from '@/components/Order/Panel/OperatorAutoCompleteForm';
import { DescriptionEditor } from '@/components/Order/RadiologyReport/Editors/DescriptionEditor';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { IOrderReportKey, setCurrentRequestID } from '@/stores/OrderRadiology';
import { selectInfoSidebar } from '@/stores/sideBar/InfoSidebarSlice';
import { IOrderRequestDTO, ModalityTypeRequiredConsumables } from '@/types/dto';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { DefaultInfoRadiologyButton } from '../../Buttons/DefaultInfoRadiologyButton';
import InfoToggleButton from '../../Buttons/InfoToggleButton';
import { ExpectedDateTime } from '../BottomFields/ExpectedDateTime';
import { OperationDateTime } from '../BottomFields/OperationDateTime';
import { RequestedDateTime } from '../BottomFields/RequestedDateTime';

import { ExpectedReporterSelectField } from './ExpectedReporterSelectField';
import { HisReportStatusInfo } from './HisReportStatusInfo';
import { LayoutSelectField } from './LayoutSelectField';
import { NumberOfConsumable } from './NumberOfConsumable';
import { PatientInfomation } from './PatientInfomation';
import { RadiologyPageLeftSideHeader } from './RadiologyPageLeftSideHeader';
import SignInfomation from './SignInfomation';

/**
 * THông tin bên trái ở màn đọc ca chậm
 */
export const RadiologyPageLeftSideWrapper: FC<IOrderReportKey> = ({
  orderID,
  requestID,
}) => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const { data: request } = useGetOneOrderRequestQuery({ orderID, requestID });
  const handleRequestChange = (request: IOrderRequestDTO) => {
    if (order?.id) {
      dispatch(setCurrentRequestID({ orderID: order.id, requestID: request.id }));
    }
  };
  const inforSidebar = useAppSelector(selectInfoSidebar);

  return inforSidebar ? (
    <StyledRadiologyPageLeftSideWrapper $inforSidebar={inforSidebar}>
      <RadiologyPageLeftSideHeader
        PatientInfo={<PatientInfomation order={order} />}
        CofigButton={<DefaultInfoRadiologyButton />}
        SignIcon={<SignInfomation order={order} requestID={requestID} />}
        HisStatusIcon={
          request?.hisReportStatus ? (
            <HisReportStatusInfo status={request?.hisReportStatus} />
          ) : (
            <></>
          )
        }
        infoToggleButton={<InfoToggleButton />}
      />
      <StyledOrderInfomation>
        <OrderRequestSelectField
          order={order}
          request={request}
          onRequestChange={handleRequestChange}
        />
        <LayoutSelectField orderID={orderID} />
        <MyTextField
          value={order?.diagnosis ?? ''}
          label={translate.resources.order.diagnosis.long()}
          fullWidth
          disabled
          size="small"
          title={order?.diagnosis ?? ''}
        />
        <StyledLeftSideRow>
          <MyTextField
            value={request?.icdCode ?? ' '}
            label={'Mã ICD'}
            size="small"
            disabled={true}
          />
          {order && request && <RequestedDateTime order={order} />}
        </StyledLeftSideRow>

        <StyledLeftSideRow>
          <ConnectedRadiologyModalitySelectForm />
          {order && request && <OperationDateTime order={order} request={request} />}
        </StyledLeftSideRow>

        <StyledLeftSideRow>
          {order && request && (
            <>
              <ExpectedReporterSelectField order={order} request={request} />
              <ExpectedDateTime order={order} request={request} />
            </>
          )}
        </StyledLeftSideRow>

        <ConnectedOperatorAutoCompleteForm
          key={requestID}
          orderID={orderID}
          requestID={requestID}
        />
        <MyTextField
          value={request?.finalApprover?.fullname ?? ''}
          label={translate.resources.order.approver.short()}
          size="small"
          disabled={true}
        />
        <DescriptionEditor />
      </StyledOrderInfomation>

      {order?.modalityType &&
        ModalityTypeRequiredConsumables.includes(order?.modalityType) && (
          <StyledConsumableWrapper>
            <>
              <NumberOfConsumable requestID={requestID} orderID={orderID} />
              <CreateUpdateConsumableTable
                requestID={requestID}
                orderID={orderID}
                request={request}
              />
            </>
          </StyledConsumableWrapper>
        )}
    </StyledRadiologyPageLeftSideWrapper>
  ) : (
    <StyledInfoSidebar>
      <InfoToggleButton />
    </StyledInfoSidebar>
  );
};

const StyledConsumableWrapper = styled(Stack)`
  width: 100%;
  height: 100%;
  min-height: 200px;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(0.5)};
  overflow: auto;
`;

const StyledOrderInfomation = styled(Stack)`
  gap: ${(props) => props.theme.spacing(1)};
`;
const StyledRadiologyPageLeftSideWrapper = styled('div', filterTransientProps)<{
  $inforSidebar: boolean;
}>`
  height: 100%;
  width: 100%;
  max-height: 100%;
  display: ${(props) => (props.$inforSidebar ? 'flex' : 'none')};
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  overflow: auto;
  max-width: 450px;
  padding: 0 ${(props) => props.theme.spacing(0.5)};
`;

const StyledLeftSideRow = styled('div')`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing(0.5)};
`;

const StyledInfoSidebar = styled('div')``;
