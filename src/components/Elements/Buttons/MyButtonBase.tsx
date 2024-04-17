import { ButtonBase, ButtonBaseProps, styled } from '@mui/material';

type IMyButtonBaseProps = ButtonBaseProps;

const StyledButtonBase = styled(ButtonBase)`
  .MuiTouchRipple-child {
    background-color: ${(props) => props.theme.palette.primary.main};
  }
`;

export const MyButtonBaseDefaults = {};

/**
 * iTech theme ButtonBase
 */
export const MyButtonBase = (props: IMyButtonBaseProps) => {
  return (
    <StyledButtonBase {...MyButtonBaseDefaults} {...props}>
      {props.children}
    </StyledButtonBase>
  );
};
