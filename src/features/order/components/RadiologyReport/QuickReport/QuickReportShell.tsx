import { styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type QuickReportShellProps = {
  children: ReactNode;
  CloseButton: ReactNode;
};

/**
 * Compose report writing component with close button
 */
export const QuickReportShell: FC<QuickReportShellProps> = (props) => {
  return (
    <StyledContainer>
      <StyledCloseButtonContainer>{props.CloseButton}</StyledCloseButtonContainer>
      {props.children}
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledCloseButtonContainer = styled('div')`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.tooltip};
  right: 0;
  top: 0;
`;
