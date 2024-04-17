import { Box, Stack, styled, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import medic from '../../assets/images/medic.svg';
import { ITicketDTO } from '../../types/ticket';
import { QMSDisplayTable } from '../QMSDisplayTable';

import { PatientWaitingTable } from './PatientWaitingTable';

type PatientWaitingListProps = {
  data?: ITicketDTO[];
};
export const PatientWaitingList: FC<PatientWaitingListProps> = (props) => {
  const { data } = props;
  return (
    <NavBarLayout>
      <>Bệnh nhân chờ khám</>
      {data ? <PatientWaitingTable data={data} isFetching={false} /> : <></>}
    </NavBarLayout>
  );
};

/**
 * Handle layout, has header and table
 */
const NavBarLayout: FC<{ children: [ReactNode, ReactNode] }> = (props) => {
  return (
    <StyledContainer spacing={1}>
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" p={4}>
        <Typography variant="h3" fontWeight={500} textTransform="uppercase">
          {props.children[0]}
        </Typography>
        <StyledImage src={medic} alt="medic"></StyledImage>
      </Box>
      <StyledQMSDisplayTable TableComponent={props.children[1]} />
    </StyledContainer>
  );
};

const StyledQMSDisplayTable = styled(QMSDisplayTable)`
  width: 100%;
`;

const StyledContainer = styled(Stack)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledImage = styled('img')`
  position: absolute;
  right: 0;
  height: ${(props) => props.theme.typography.h1.fontSize};
`;
