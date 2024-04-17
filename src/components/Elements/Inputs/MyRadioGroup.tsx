import { RadioGroup, RadioGroupProps, styled } from '@mui/material';
import { forwardRef } from 'react';

export type IMyRadioGroupProps = RadioGroupProps;

const StyledRadioGroup = styled(RadioGroup)``;

export const MyRadioGroupDefaults: IMyRadioGroupProps = {};

export const MyRadioGroup = forwardRef<unknown, IMyRadioGroupProps>(
  (props: IMyRadioGroupProps, ref) => {
    return <StyledRadioGroup {...MyRadioGroupDefaults} {...props} ref={ref} />;
  },
);

MyRadioGroup.displayName = 'MuiRadioGroup';
