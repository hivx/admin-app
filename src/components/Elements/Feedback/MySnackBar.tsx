import { Snackbar, SnackbarProps, styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISnackbarProps extends SnackbarProps {}

const StyledSnackbar = styled(Snackbar)``;

export const SnackbarDefault: ISnackbarProps = {};

export const MySnackbar = (props: ISnackbarProps) => {
  return <StyledSnackbar {...SnackbarDefault} {...props} />;
};
