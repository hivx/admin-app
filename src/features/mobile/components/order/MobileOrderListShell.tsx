import { Stack, styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type MobileOrderListShellProps = {
  FilterComponent: ReactNode;
  TableComponent: ReactNode;
};
export const MobileOrderListShell: FC<MobileOrderListShellProps> = ({
  FilterComponent,
  TableComponent,
}) => {
  return (
    <StyledMobileOrderListShell>
      {FilterComponent}
      <Stack p={0.5} height="100%" overflow="hidden" spacing={2}>
        {TableComponent}
      </Stack>
    </StyledMobileOrderListShell>
  );
};
const StyledMobileOrderListShell = styled('div')`
  display: grid;
  grid-template-rows: 0.5fr 3fr;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  padding: ${(props) => props.theme.spacing(0.5)};
`;
