import { Dialog, DialogProps, styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMyDialogProps extends DialogProps {}

const StyledDialog = styled(Dialog)``;

export const MyDialog = (props: IMyDialogProps) => {
  return <StyledDialog {...props}>{props.children}</StyledDialog>;
};
