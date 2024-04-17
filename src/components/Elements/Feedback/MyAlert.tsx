import { Alert, AlertProps, styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMyAlertProps extends AlertProps {}

const StyledAlert = styled(Alert)``;

export const MyAlertDefault: IMyAlertProps = {};

export const MyAlert = (props: IMyAlertProps) => {
  return (
    <StyledAlert {...MyAlertDefault} {...props}>
      {props.children}
    </StyledAlert>
  );
};
