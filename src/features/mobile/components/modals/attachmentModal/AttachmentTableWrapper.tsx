import { Stack, Typography, styled } from '@mui/material';
import React from 'react';

import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { MobileDisplayTableNoButtons } from '../../table/MobileDisplayTableNoButtons';

import { AttachmentActionButton } from './AttachmentActionButton';
import { MobileAttachmentTable } from './MobileAttachmentTable';

export const AttachmentTableWrapper = ({ order }: { order: IOrderDTO }) => {
  const translate = useTranslate();
  return (
    <Stack padding={1} spacing={1}>
      <StyledAttachmentModalContentHeader>
        <StyledDivCenterChildren>
          <Typography variant="body1" textTransform="uppercase">
            {translate.resources.report.attachment.title()}
          </Typography>
        </StyledDivCenterChildren>
        <AttachmentActionButton orderID={order.id} />
      </StyledAttachmentModalContentHeader>
      <MobileDisplayTableNoButtons
        TableComponent={<MobileAttachmentTable orderID={order.id} />}
      />
    </Stack>
  );
};

const StyledAttachmentModalContentHeader = styled('div')`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
`;
