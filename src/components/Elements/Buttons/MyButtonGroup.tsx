import { ButtonGroup, ButtonGroupProps, styled } from '@mui/material';
import { forwardRef } from 'react';

type IMyButtonGroupProps = ButtonGroupProps;

const StyledButtonGroup = styled(ButtonGroup)``;

export const MyButtonGroupDefaults: IMyButtonGroupProps = {
  disableElevation: true,
};
export const MyButtonGroup = forwardRef<HTMLDivElement, IMyButtonGroupProps>(
  (props: IMyButtonGroupProps, ref) => {
    return (
      <StyledButtonGroup {...MyButtonGroupDefaults} {...props} ref={ref}>
        {props.children}
      </StyledButtonGroup>
    );
  },
);

MyButtonGroup.displayName = 'MuiButtonGroup';
