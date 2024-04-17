import React, { FC, forwardRef, PropsWithChildren } from 'react';

import { MyButton, IMyButtonProps } from '@/components';

/**
 * A variant of button that is used as the main action button in radiology report panel
 */
export const MainButton: FC<PropsWithChildren & IMyButtonProps> = forwardRef(
  (props, ref) => {
    const { sx, ...propsWithoutSx } = props;
    return (
      <MyButton
        ref={ref}
        variant="contained"
        size="small"
        sx={{ p: 0.75, width: '100%', height: '100%', ...sx }}
        {...propsWithoutSx}
      >
        {props.children}
      </MyButton>
    );
  },
);

MainButton.displayName = 'MuiButton';
