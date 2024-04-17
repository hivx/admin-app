import { styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type UploadNonDicomModalShellProps = {
  children: ReactNode;
  CloseButton: ReactNode;
};

/**
 * Create NonDicom component with close button
 */
export const UploadNonDicomModalShell: FC<UploadNonDicomModalShellProps> = (props) => {
  return (
    <StyledContainer>
      <StyledCloseButtonContainer>{props.CloseButton}</StyledCloseButtonContainer>
      {props.children}
    </StyledContainer>
  );
};

/**
 * Styles
 */
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
