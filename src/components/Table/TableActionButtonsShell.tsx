import { Box, BoxProps, Stack, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type TableActionButtonsShellProps = {
  ActionsButton: ReactNode;
  ContainerProps?: BoxProps;
};

/**
 * This component will control buttons on footer table
 */
export const TableActionButtonsShell: FC<TableActionButtonsShellProps> = (props) => {
  const { ActionsButton, ContainerProps } = props;
  return (
    <StyledTableActionButtonsShellWrapper {...ContainerProps}>
      <>
        <StyledActionButtonStack direction="row">{ActionsButton}</StyledActionButtonStack>
      </>
    </StyledTableActionButtonsShellWrapper>
  );
};

/**
 * Styles
 */

const StyledTableActionButtonsShellWrapper = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: start;
`;

const StyledActionButtonStack = styled(Stack)``;
