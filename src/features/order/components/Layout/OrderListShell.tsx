import { Stack, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';

type OrderListShellProps = {
  TableComponent: ReactNode;
  PanelComponent: ReactNode;
};

export const OrderListShell: FC<OrderListShellProps> = (props) => {
  const { TableComponent, PanelComponent } = props;
  return (
    <StyledOrderListShell>
      <StyledTableContainerWithCollapsiblePanel>
        <Stack height="100%" overflow="hidden" spacing={2}>
          {TableComponent}
        </Stack>
        {PanelComponent}
      </StyledTableContainerWithCollapsiblePanel>
    </StyledOrderListShell>
  );
};

const StyledOrderListShell = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  /* padding: ${(props) => props.theme.spacing(1)}; */
  padding-bottom: 0;
`;
