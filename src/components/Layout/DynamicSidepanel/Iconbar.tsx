import { Stack, styled, StackProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const Iconbar: FC<PropsWithChildren & StackProps> = (props) => {
  return (
    <StyledLayout direction="column" spacing={0.5} {...props}>
      {props.children}
    </StyledLayout>
  );
};

const StyledLayout = styled(Stack)``;
