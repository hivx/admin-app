import { Button, ButtonProps, styled } from '@mui/material';
import { forwardRef } from 'react';

export interface IMyButtonProps extends ButtonProps {
  // custom props goes here
  /**
   * Triet: This is how you write comment for this props on Storybook.
   * This prop doesn't do anything and is put here as example.
   */
  custom?: string;
  /**
   * @default true
   */
  disableElevation?: boolean;
}

const StyledButton = styled(Button)`
  box-shadow: 'none';
  min-width: 100px;
  border-radius: 3px;
  font-weight: 400;
  padding: 0;
  color: ${(props) =>
    props.variant === 'contained'
      ? props.theme.palette.getContrastText(props.theme.palette.primary.main)
      : ''};
`;

export const MyButtonDefaults: IMyButtonProps = {
  /**
   * Triet: remember to add default override in Props we change any default property
   * Example: default disableElevation in MUI is FALSE, if we change to TRUE then we need to
   * update MyButtonProps' default value
   */
  disableElevation: true,
};

/**
 * iTech themed Button from MUI
 */
export const MyButton = forwardRef<HTMLButtonElement, IMyButtonProps>(
  (props: IMyButtonProps, ref) => {
    return (
      <StyledButton {...MyButtonDefaults} {...props} ref={ref}>
        {props.children}
      </StyledButton>
    );
  },
);

MyButton.displayName = 'MuiButton';
