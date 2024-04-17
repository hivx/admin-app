import { styled, Typography } from '@mui/material';
import { FC } from 'react';

import { useAppSelector } from '@/hooks';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { QMS_RESOURCES } from '@/types/resources';

import { ITicketDTO } from '../../types/ticket';

export const TicketNumber: FC = () => {
  const record = useAppSelector(
    getCurrentSelectedRow<ITicketDTO>(QMS_RESOURCES.QMS_TICKET),
  );
  return (
    <StyledTicketNumberContainer sx={{ p: 2, border: '1px solid grey' }}>
      <Typography>STT vào chụp:</Typography>
      <StyledTicketNumber>{record?.ticketNumber ?? '____'}</StyledTicketNumber>
    </StyledTicketNumberContainer>
  );
};

const StyledTicketNumberContainer = styled('div')`
  width: 176px;
`;

const StyledTicketNumber = styled(Typography)`
  font-size: 46px;
`;
