import { Grid, styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { useGetListTicketQuery } from '../../api/ticket';

import { CurrentPatient } from './CurrentPatient';
import { PatientWaitingList } from './PatientWaitingList';

const POLLING_INTERVAL = 5 * 1000;
/**
 * fetch data and process data
 */
export const PatientWaitingScreenMain: FC<{ modalityID: number }> = (props) => {
  const { modalityID } = props;
  const { data } = useGetListTicketQuery(
    {
      filter: {
        status: 'STARTED',
        modalityID,
      },
    },
    { pollingInterval: POLLING_INTERVAL, skip: isNaN(modalityID) },
  );

  const firstTicket = data?.list[0];
  return (
    <NavBarLayout>
      <CurrentPatient ticket={firstTicket} />
      <PatientWaitingList data={data?.list.slice(1)} />
    </NavBarLayout>
  );
};

/**
 * Handle Layout. Divided into 2 columns
 */
const NavBarLayout: FC<{ children: [ReactNode, ReactNode] }> = (props) => {
  return (
    <StyledContainer container direction="row" wrap="nowrap" alignItems="center">
      <Grid item xs={5} p={4} height="100%">
        {props.children[0]}
      </Grid>
      <Grid item xs={7} px={4} py={1} height="100%">
        {props.children[1]}
      </Grid>
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)`
  width: 100%;
  height: 100%;
  color: ${(props) =>
    props.theme.palette.getContrastText(props.theme.palette.primary.main)};
  background-color: ${(props) => props.theme.palette.primary.main};
`;
