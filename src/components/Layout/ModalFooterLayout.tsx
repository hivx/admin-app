import { Box, BoxProps, Stack, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type ModalFooterLayoutProps = {
  ActionButton: ReactNode;
  OptionalButtons?: ReactNode[];
  ContainerProps?: BoxProps;
};

/**
 * Footer modal usually has 2 buttons on each side: 1 Action button and a list of optional buttons on the other side
 * This component takes care of composition those button
 */
export const ModalFooterLayout: FC<ModalFooterLayoutProps> = (props) => {
  const { ActionButton, OptionalButtons, ContainerProps } = props;
  return (
    <StyledModalFooterWrapper {...ContainerProps}>
      <>
        <StyledActionButton>{ActionButton}</StyledActionButton>
        <StyledOptionalButtons spacing={1} direction="row">
          {OptionalButtons && OptionalButtons}
        </StyledOptionalButtons>
      </>
    </StyledModalFooterWrapper>
  );
};

/**
 * Styles
 */

const StyledModalFooterWrapper = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledOptionalButtons = styled(Stack)``;
const StyledActionButton = styled(Box)``;
