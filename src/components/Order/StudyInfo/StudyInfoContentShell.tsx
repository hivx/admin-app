import { lighten, Stack, styled, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type StudyInfoContentShellProps = {
  PatientInfoHeader: ReactNode;
  OrderInfoHeader: ReactNode;
  PatientInfoContent: ReactNode;
  OrderInfoContent: ReactNode;
};

export const StudyInfoContentShell: FC<StudyInfoContentShellProps> = (props) => {
  return (
    <StyledStudyInfoContentShellContainer spacing={1}>
      <StyledPatientStudyInfo>
        <StyledPatientInfoHeader textTransform="uppercase">
          {props.PatientInfoHeader}
        </StyledPatientInfoHeader>
        <StyledPatientInfoContent>{props.PatientInfoContent}</StyledPatientInfoContent>
      </StyledPatientStudyInfo>
      <StyledProcedureStudyInfo>
        <StyledOrderInfoHeader textTransform="uppercase">
          {props.OrderInfoHeader}
        </StyledOrderInfoHeader>
        <StyledOrderInfoContent>{props.OrderInfoContent}</StyledOrderInfoContent>
      </StyledProcedureStudyInfo>
    </StyledStudyInfoContentShellContainer>
  );
};

const StyledStudyInfoContentShellContainer = styled(Stack)`
  width: 100%;
  height: 100%;
`;

const StyledPatientInfoHeader = styled(Typography)``;

const StyledOrderInfoHeader = styled(Typography)``;

const StyledProcedureStudyInfo = styled(Stack)``;

const StyledPatientInfoContent = styled('div')`
  display: grid;
  /* gap: ${(props) => props.theme.spacing(1)}; */
  border: 1px solid ${(props) => lighten(props.theme.palette.text.primary, 0.6)};
  border-radius: 3px;
`;

const StyledOrderInfoContent = styled('div')``;

const StyledPatientStudyInfo = styled(Stack)``;
