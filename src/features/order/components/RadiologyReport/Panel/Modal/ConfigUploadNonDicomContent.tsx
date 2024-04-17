import { styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type ConfigUploadNonDicomContentProps = {
  children: ReactNode;
  CloseButton: ReactNode;
};

/**
 * ConfigUploadNonDicomContent component with close button
 */
export const ConfigUploadNonDicomContent: FC<ConfigUploadNonDicomContentProps> = (
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
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: ${(props) => props.theme.spacing(0.5)}
    ${(props) => props.theme.spacing(0.5)} 0 0;
`;

const StyledCloseButtonContainer = styled('div')`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.tooltip};
  right: 0;
  top: 0;
`;
