import { styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type RadiologyReportPanelShellProps = {
  /**
   * Display action buttons and template selection
   */
  ReportHeader: ReactNode;
  /**
   * Display group of Editors and Inputs of Radiology Report
   */
  ReportContent: ReactNode;
  /**
   * Bottom fields: Group of some fields  Chỉ định ,CĐLS, Bác sĩ đọc, Bác sĩ duyệt
   */
  // BottomField: ReactNode;
};
export const RadiologyReportPanelShell: FC<RadiologyReportPanelShellProps> = (props) => {
  const { ReportHeader, ReportContent } = props;
  return (
    <StyledContainer>
      {ReportHeader}
      {ReportContent}
      {/* {BottomField} */}
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: grid;
  grid-template-rows: auto minmax(50vh, 1fr);
  padding: ${(props) => props.theme.spacing(0.5)};
  gap: ${(props) => props.theme.spacing(1)};
  overflow: hidden;
`;
