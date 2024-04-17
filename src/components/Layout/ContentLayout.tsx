import { Box, styled } from '@mui/material';
import * as React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  className?: string;
  Head?: React.ReactNode;
};

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  className,
  Head,
}) => {
  return (
    <StyledContentLayout className={className}>
      <>
        {Head}
        {children}
      </>
    </StyledContentLayout>
  );
};

const StyledContentLayout = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.paper};
`;
