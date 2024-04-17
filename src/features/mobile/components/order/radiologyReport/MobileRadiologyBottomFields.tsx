import { styled } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { FC } from 'react';

import { useGetOneRadiologyReportQuery } from '@/api/radiologyReport';
import { ApproverInfoWrapper } from '@/components/Order/DynamicPanel/OrderReport/ApproverInfoWrapper';
import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import OrderStatuses from '@/components/Order/Panel/OrderStatuses';
import { useTranslate } from '@/hooks';
import { BaseEntity } from '@/types';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

type BottomFieldsPanelProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  reportID?: BaseEntity['id'];
};

/**
 * Trường CDLS,BS Đọc,BS Duyệt
 */
export const MobileRadiologyBottomFields: FC<BottomFieldsPanelProps> = ({
  order,
  reportID,
  request,
}) => {
  const { data: reportData } = useGetOneRadiologyReportQuery(
    order?.id && request?.id && reportID
      ? {
          orderID: order.id,
          requestID: request.id,
          reportID: reportID,
        }
      : skipToken,
  );
  const translate = useTranslate();

  return (
    <StyledRadiologyBottomFields>
      <OrderInfoField
        Label={
          <OrderInfoTypography>
            {translate.resources.order.diagnosis.short()}
          </OrderInfoTypography>
        }
        FieldValue={
          <OrderInfoTypography title={order?.diagnosis ?? ''}>
            {order?.diagnosis ?? ''}
          </OrderInfoTypography>
        }
        labelXS={4}
      />
      <OrderInfoField
        Label={
          <OrderInfoTypography>
            {translate.resources.order.reporter.short()}
          </OrderInfoTypography>
        }
        FieldValue={
          <OrderInfoTypography title={reportData?.reporter?.fullname ?? ''}>
            {reportData?.reporter?.fullname}
          </OrderInfoTypography>
        }
        labelXS={4}
      />
      <OrderInfoField
        Label={
          <OrderInfoTypography>
            {translate.resources.order.approver.short()}
          </OrderInfoTypography>
        }
        FieldValue={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              overflowX: 'auto',
            }}
          >
            <ApproverInfoWrapper request={request} />
            <OrderStatuses order={order} request={request} sx={{ height: '20px' }} />
          </div>
        }
        labelXS={4}
      />
    </StyledRadiologyBottomFields>
  );
};

const StyledRadiologyBottomFields = styled('div')`
  width: 100%;
  display: grid;
  gap: ${(props) => props.theme.spacing(0.5)};
`;
