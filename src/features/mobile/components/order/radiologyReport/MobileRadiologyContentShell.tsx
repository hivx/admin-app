import { Stack, styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type MobileRadiologyContentShellProps = {
  ActionButton: ReactNode;
  FindingsEditor: ReactNode;
  ImpressionEditor: ReactNode;
  ProceduresSelectFields: ReactNode;
  TechnicianField?: ReactNode;
  TranscriberField?: ReactNode;
  BottomFields: ReactNode;
  ModalitySelectField: ReactNode;
  ApprovedDateField: ReactNode;
};

export const MobileRadiologyContentShell: FC<MobileRadiologyContentShellProps> = ({
  ActionButton,
  FindingsEditor,
  ImpressionEditor,
  ProceduresSelectFields,
  TechnicianField,
  TranscriberField,
  BottomFields,
  ModalitySelectField,
  ApprovedDateField,
}) => {
  return (
    <StyledMobileRadiologyContentShell>
      <StyledButtonContainer>{ActionButton}</StyledButtonContainer>
      {ProceduresSelectFields}
      <StyledEditorContainer>
        {FindingsEditor}
        {ImpressionEditor}
      </StyledEditorContainer>
      {ModalitySelectField}
      {ApprovedDateField}
      <StyledUserContainer>
        {TechnicianField}
        {TranscriberField}
      </StyledUserContainer>
      {BottomFields}
    </StyledMobileRadiologyContentShell>
  );
};

const StyledUserContainer = styled(Stack)`
  width: 100%;
  display: grid;
  gap: ${(props) => props.theme.spacing(0.5)};
`;

const StyledButtonContainer = styled(Stack)`
  width: 100%;
`;
const StyledEditorContainer = styled('div')`
  display: grid;
  grid-template-rows: 2fr 0.5fr;
  gap: ${(props) => props.theme.spacing(1)};
  width: 100%;
`;
const StyledMobileRadiologyContentShell = styled('div')`
  display: grid;
  grid-template-rows: auto auto 6fr auto auto auto;
  width: 100%;
  height: 100vh;
  padding: ${(props) => props.theme.spacing(1)};
  gap: ${(props) => props.theme.spacing(2)};
  overflow: auto;
`;
