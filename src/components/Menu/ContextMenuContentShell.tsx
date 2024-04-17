import { styled, SxProps } from '@mui/material';
import { FC, forwardRef, ReactNode } from 'react';

type ContextMenuContentShellProps = {
  sx?: SxProps;
  children?: ReactNode;
};
export const ContextMenuContentShell: FC<ContextMenuContentShellProps> = forwardRef<
  HTMLDivElement,
  ContextMenuContentShellProps
>((props, ref) => {
  return (
    <StyledContextMenuContentShell ref={ref} sx={props.sx}>
      {props.children}
    </StyledContextMenuContentShell>
  );
});

ContextMenuContentShell.displayName = 'ContextMenuContentShell';

const StyledContextMenuContentShell = styled('div')``;
