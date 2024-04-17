import { ToggleButton, ToggleButtonProps, styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMyToggleButtonProps extends ToggleButtonProps {}

const StyledToggleButton = styled(ToggleButton)``;

export const MyToggleButtonDefaults: Omit<IMyToggleButtonProps, `value`> = {};

export const MyToggleButton = (props: IMyToggleButtonProps) => {
  return (
    <StyledToggleButton {...MyToggleButtonDefaults} {...props}>
      {props.children}
    </StyledToggleButton>
  );
};
