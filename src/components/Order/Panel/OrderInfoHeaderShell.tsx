import { Stack, styled, lighten } from '@mui/material';
import { FC } from 'react';

type OrderInfoHeaderShellProps = {
  RightSideHeaderComponent: React.ReactNode;
  LeftSideHeaderComponent: React.ReactNode;
};

const STACK_SPACING = 1;

const OrderInfoHeaderShell: FC<OrderInfoHeaderShellProps> = (props) => {
  const { RightSideHeaderComponent, LeftSideHeaderComponent } = props;
  return (
    <OrderInfoHeaderContainer
      spacing={STACK_SPACING}
      width="100%"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {LeftSideHeaderComponent}
      {RightSideHeaderComponent}
    </OrderInfoHeaderContainer>
  );
};

export default OrderInfoHeaderShell;

const OrderInfoHeaderContainer = styled(Stack)`
  height: 100%;
  border-bottom: 1px solid ${(props) => lighten(props.theme.palette.secondary.main, 0.4)};
  padding-right: ${(props) => props.theme.spacing(1)};
  padding-top: ${(props) => props.theme.spacing(0.5)};
  padding-bottom: ${(props) => props.theme.spacing(0.5)};
`;
