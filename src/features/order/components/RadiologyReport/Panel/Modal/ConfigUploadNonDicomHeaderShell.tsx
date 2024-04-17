import { styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type ConfigUploadNonDicomHeaderShellProps = {
  children: ReactNode;
  CloseButton: ReactNode;
};

/**
 * ConfigUploadNonDicomHeaderShell component with close button
 */
export const ConfigUploadNonDicomHeaderShell: FC<ConfigUploadNonDicomHeaderShellProps> = (
  props,
) => {
  return (
    <StyledHeaderContainer>
      <StyledCloseButtonContainer>{props.CloseButton}</StyledCloseButtonContainer>
      {props.children}
    </StyledHeaderContainer>
  );
};

/**
 * Styles
 */
const StyledHeaderContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.theme.pacs?.customColors.tableHeaderBackground};
  border-radius: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(0.5)} 0 0;
`;

const StyledCloseButtonContainer = styled('div')`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.tooltip};
  right: 0;
  top: 0;
`;
