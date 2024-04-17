import { styled, Switch, SwitchProps } from '@mui/material';

type IMySwitchProps = SwitchProps;

const StyledSwitch = styled(Switch)``;

export const MySwitchDefaults: IMySwitchProps = {};

export const MySwitch = (props: IMySwitchProps) => {
  return <StyledSwitch {...MySwitchDefaults} {...props} />;
};
