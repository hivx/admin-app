import { Box, Stack, styled } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useCurrentOrderID } from '@/features/order';

import { ContentTemplateButton } from '../Buttons/ContentTemplateButton';
import PersonalContentTemplateButton from '../Buttons/PersonalContentTemplateButton';
import { SaveContentTemplateButton } from '../Buttons/SaveContentTemplateButton';

import ContentTemplateSelectField from './ContentTemplateSelectField';

type RadiologyReportPanelHeaderProps = {
  ActionButtons: React.ReactNode;
};
export const RadiologyReportPanelHeader: FC<RadiologyReportPanelHeaderProps> = (
  props,
) => {
  const { ActionButtons } = props;
  const orderID = useCurrentOrderID();
  const { data: order } = useGetOneOrderQuery({ id: orderID });

  return order ? (
    <Layout>
      <StyledActionButtonRow>
        {ActionButtons}
        <StyledContentGroupActions>
          <Stack direction="row" alignItems="center">
            {/**
             * Personal content template button
             */}
            <PersonalContentTemplateButton orderID={order.id} />
            <ContentTemplateSelectField modalityType={order.modalityType} />

            {/**
             * Button content template
             */}
            <ContentTemplateButton />
            {/**
             * Button Save content template
             */}
            <SaveContentTemplateButton />
          </Stack>
        </StyledContentGroupActions>
      </StyledActionButtonRow>
      {/* <OrderDetailedInfo
        order={order}
        request={request}
        readonly={false}
        onRequestChange={handleRequestChange}
      /> */}
    </Layout>
  ) : (
    <Box height="120px" width="100%">
      <FullPageSpinner />
    </Box>
  );
};

const Layout: FC<PropsWithChildren> = (props) => (
  <StyledContainer>{props.children}</StyledContainer>
);

const StyledContainer = styled('div')`
  display: grid;
  grid-template-rows: auto 1fr;
  /* gap: ${(props) => props.theme.spacing(1)}; */
`;

const StyledActionButtonRow = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${(props) => props.theme.spacing(3)};
`;

const StyledContentGroupActions = styled('div')`
  width: 100%;
  min-width: 100px;
  overflow: auto;
`;
