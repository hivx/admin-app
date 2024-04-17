import { lighten, styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type RadiologyReportShellProps = {
  /**
   * Display action buttons and template selection
   */
  ReportHeader: ReactNode;
  /**
   * Display group of Editors and Inputs of Radiology Report
   */
  ReportContent: ReactNode;
};

/**
 * Wrapper quick radiology report in bottom panel
 */
export const RadiologyReportShell: FC<RadiologyReportShellProps> = (props) => {
  const { ReportHeader, ReportContent } = props;
  return (
    <>
      <StyledReportHeaderWrapper>{ReportHeader}</StyledReportHeaderWrapper>
      <StyledReportContentContainer>
        <StyledReportContentWrapper>{ReportContent}</StyledReportContentWrapper>
      </StyledReportContentContainer>
    </>
  );
};

const StyledReportHeaderWrapper = styled('div')`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1)};
  border-bottom: 1px solid ${(props) => lighten(props.theme.palette.text.primary, 0.7)};
`;
const StyledReportContentWrapper = styled('div')`
  min-height: 350px;
`;
const StyledReportContentContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: grid;
  padding: ${(props) => props.theme.spacing(1)};
  gap: ${(props) => props.theme.spacing(1.5)};
  overflow: auto;
`;
