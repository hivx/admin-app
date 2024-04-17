import { Box, BoxProps, Stack, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type TicketActionButtonsShellProps = {
  ActionsButton: ReactNode[];
  ContainerProps?: BoxProps;
};

/**
 * This component will control buttons on footer table
 */
export const TicketActionButtonsShell: FC<TicketActionButtonsShellProps> = (props) => {
  const { ActionsButton, ContainerProps } = props;
  return (
    <StyledTicketActionButtonsShellWrapper {...ContainerProps}>
      <>
        <StyledActionButtonStack direction="row">{ActionsButton}</StyledActionButtonStack>
      </>
    </StyledTicketActionButtonsShellWrapper>
  );
};

/**
 * Styles
 */

const StyledTicketActionButtonsShellWrapper = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: left;
`;

const StyledActionButtonStack = styled(Stack)``;
