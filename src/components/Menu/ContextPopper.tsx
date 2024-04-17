import { Grow, Popper, PopperProps, useTheme } from '@mui/material';
import { FC, forwardRef, ReactNode } from 'react';

import { ContextMenuContentShell } from './ContextMenuContentShell';

type ContextPopperProps = {
  isOpen: boolean;
  anchorEl: PopperProps['anchorEl'];
  children?: ReactNode;
};

export const ContextPopper: FC<ContextPopperProps> = forwardRef<
  HTMLDivElement,
  ContextPopperProps
>((props, ref) => {
  const { anchorEl, isOpen } = props;
  const theme = useTheme();

  return (
    <Popper
      open={isOpen}
      anchorEl={anchorEl}
      placement="auto-end"
      transition
      ref={ref}
      sx={{ zIndex: theme.zIndex.tooltip }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          unmountOnExit
          exit={false}
          style={{ transformOrigin: '0 0 0' }}
        >
          <div>
            <ContextMenuContentShell>{props.children}</ContextMenuContentShell>
          </div>
        </Grow>
      )}
    </Popper>
  );
});

ContextPopper.displayName = 'ContextPopper';
