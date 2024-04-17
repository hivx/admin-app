import { Grid, Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, ReactNode } from 'react';

type TicketShellProps = {
  TableComponent: ReactNode;
  FilterComponent: ReactNode;
  ActionButons: ReactNode;
  TicketNumber: ReactNode;
  RoomName: ReactNode;
};

export const TicketShell: FC<TicketShellProps> = (props) => {
  const { TableComponent, FilterComponent, ActionButons, TicketNumber, RoomName } = props;
  return (
    <StyledTicketShell>
      <TicketTopbarWrapper>
        <TicketTopbarLeftWrapper>
          <StyledFilterContainer>{FilterComponent}</StyledFilterContainer>
          <StyledActionButtonsContainer>{ActionButons}</StyledActionButtonsContainer>
        </TicketTopbarLeftWrapper>
        {RoomName}
        <StyledTicketNumberWrapper item xs={5} justifyContent="end">
          {TicketNumber}
        </StyledTicketNumberWrapper>
      </TicketTopbarWrapper>
      <StyledTableContainer>{TableComponent}</StyledTableContainer>
    </StyledTicketShell>
  );
};

const TicketTopbarWrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
`;

const TicketTopbarLeftWrapper = styled(Stack)`
  width: 100%;
  gap: ${(props) => props.theme.spacing(3)};
`;
const StyledTicketShell = styled(Stack)`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  width: 100%;
  height: 100%;
  /* max-height: 100%; */
  overflow: hidden;
  padding: ${(props) => props.theme.spacing(1)};
  padding-bottom: 0;
`;

const StyledTableContainer = styled('div')`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: auto;
  /* max-height: 100%; */
`;

const StyledFilterContainer = styled('div')`
  display: flex;
  width: 100%;
  /* max-height: 100%; */
`;

const StyledActionButtonsContainer = styled('div')`
  display: flex;
  width: 50%;
  /* max-height: 100%; */
`;

const StyledTicketNumberWrapper = styled(Grid)`
  display: flex;
`;
