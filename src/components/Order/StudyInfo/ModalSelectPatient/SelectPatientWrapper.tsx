import { Box, styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type SearchPatientWrapperProps = {
  FilterComponent: ReactNode;
  TableComponent: ReactNode;
};

/**
 * Component wrap Filter & Table  of ModalSelectPatient
 */
export const SelectPatientWrapper: FC<SearchPatientWrapperProps> = ({
  FilterComponent,
  TableComponent,
}) => {
  return (
    <StyledSearchPatientWrapper>
      <div>{FilterComponent}</div>
      <StyledTablePatientContainer>{TableComponent}</StyledTablePatientContainer>
    </StyledSearchPatientWrapper>
  );
};

const StyledSearchPatientWrapper = styled('div')`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 0.25fr 1fr;
`;
const StyledTablePatientContainer = styled(Box)`
  display: grid;
  margin-top: ${(props) => props.theme.spacing(1)};
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
`;
