import { styled } from '@mui/material';
import React, { FC } from 'react';

type PrintAndApproveContentShellProps = {
  PreviewPdf: React.ReactNode;
  InfomationUpdatePdf: React.ReactNode;
};
const PrintAndApproveContentShell: FC<PrintAndApproveContentShellProps> = (props) => {
  const { PreviewPdf, InfomationUpdatePdf } = props;
  return (
    <StyledPrintAndApproveContentShellContainer>
      {PreviewPdf}
      {InfomationUpdatePdf}
    </StyledPrintAndApproveContentShellContainer>
  );
};

export default PrintAndApproveContentShell;

const StyledPrintAndApproveContentShellContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(70%, 5fr) minmax(30%, 1fr);
  grid-template-rows: 100%;
`;
