import { Divider, styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { DynamicTopbar } from './DynamicTopbar';

type LayoutWithTopbarWrapperProps = {
  MainComponent: ReactNode;
  onBackward: () => void;
  title: string;
};

export const LayoutWithTopbarWrapper: FC<LayoutWithTopbarWrapperProps> = ({
  MainComponent,
  onBackward,
  title,
}) => {
  return (
    <>
      <StyledLayoutWithTopbarWrapper>
        <DynamicTopbar onBackward={() => onBackward()} title={title} />
        <Divider />
      </StyledLayoutWithTopbarWrapper>
      {MainComponent}
    </>
  );
};

const StyledLayoutWithTopbarWrapper = styled('div')`
  background-color: ${(props) => props.theme.palette.primary.main};
`;
