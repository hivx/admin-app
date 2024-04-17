import { Stack, styled } from '@mui/material';
import React, { FC } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { useGetOneOrderRequestQuery } from '@/api/orderRequest';
import { useGetListRadiologyReportQuery } from '@/api/radiologyReport';
import { SidebarLayout } from '@/components/Elements/Navigation/SidebarLayout';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useTranslate, useAppSelector } from '@/hooks';
import { selectCurrentRequestID } from '@/stores/OrderRadiology';

import { useCurrentOrderID } from '../../../providers';

import { RadiologyReportOrderHistory } from './RadiologyReportOrderHistoryShell';
import { RadiologyReportOrderInfo } from './RadiologyReportOrderInfoShell';

export const RadiologyReportInfoSidebar: FC = () => {
  const translate = useTranslate();
  const currentOrderID = useCurrentOrderID();
  const currentRequestID = useAppSelector(selectCurrentRequestID(currentOrderID));
  const { data: order } = useGetOneOrderQuery({ id: currentOrderID });
  const {
    data: listCurrentReport,
    refetch: refetchReportList,
    isFetching,
  } = useGetListRadiologyReportQuery({
    orderID: currentOrderID,
    requestID: currentRequestID,
  });

  const { data: requestData } = useGetOneOrderRequestQuery({
    orderID: currentOrderID,
    requestID: currentRequestID,
  });

  return (
    <SidebarLayout title={translate.pages.orderReport.orderInfo()} collapsible>
      <StyledContainer>
        {!isFetching && listCurrentReport && order && requestData ? (
          <RadiologyReportOrderInfo
            listCurrentReport={listCurrentReport.list}
            refetchReportList={refetchReportList}
            order={order}
            requestData={requestData}
          />
        ) : (
          <FullPageSpinner />
        )}
        <RadiologyReportOrderHistory />
      </StyledContainer>
    </SidebarLayout>
  );
};

const StyledContainer = styled(Stack)`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: calc(100% - ${(props) => props.theme.pacs?.layout.sidebarHeaderHeight});
  display: grid;
  grid-template-rows: 70% 30%;
`;
