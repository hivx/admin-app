import { Box, BoxProps, Stack, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type OrderPanelActionButtonsShellProps = {
  ActionButtons: ReactNode;
  ContainerProps?: BoxProps;
};

/**
 * This component will control buttons on footer table
 */
export const OrderPanelActionButtonsShell: FC<OrderPanelActionButtonsShellProps> = (
  props,
) => {
  const { ActionButtons, ContainerProps } = props;
  return (
    <StyledOrderPanelActionButtonsShellWrapper {...ContainerProps}>
      <StyledActionButtonStack direction="row">{ActionButtons}</StyledActionButtonStack>
    </StyledOrderPanelActionButtonsShellWrapper>
  );
};

/**
 * Styles
 */

const StyledOrderPanelActionButtonsShellWrapper = styled(Box)``;

const StyledActionButtonStack = styled(Stack)``;
