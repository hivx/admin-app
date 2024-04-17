import { styled } from '@mui/material';
import React from 'react';

import { MyDivider } from '@/components/Elements';
import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';

import { OrderReadonlyReport } from '../../Panel/OrderReadonlyReport';

const OrderPanelResultDiagnosis = (props: {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  reportID?: IRadiologyReportDTO['id'];
}) => {
  const { order, request, reportID } = props;

  return (
    <StyledOrderPanelResultDiagnosisContainer>
      <StyledOrderReadonlyReportMain>
        <OrderReadonlyReport order={order} request={request} reportID={reportID} />
      </StyledOrderReadonlyReportMain>
      <StyledDivider orientation="horizontal" />
      {/* <StyledInfoOrder>
        <ApproverInfoWrapper request={request} />
        <OrderStatuses order={order} request={request} />
      </StyledInfoOrder> */}
    </StyledOrderPanelResultDiagnosisContainer>
  );
};

export default OrderPanelResultDiagnosis;

const StyledOrderPanelResultDiagnosisContainer = styled('div')`
  --paddingSize: ${(props) => props.theme.spacing(1)};
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto auto;
  padding: 0 var(--paddingSize);
  overflow: hidden;
`;

const StyledOrderReadonlyReportMain = styled('div')`
  padding: var(--paddingSize) 0;
  overflow: auto;
`;

const StyledInfoOrder = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${(props) => props.theme.spacing(4)};
`;

/**
 * Make this divider fill the entire panel
 */
const StyledDivider = styled(MyDivider)`
  max-width: calc(100% + 2 * var(--paddingSize));
  width: calc(100% + 2 * var(--paddingSize));
  margin: 0 calc(-1 * var(--paddingSize));
`;
