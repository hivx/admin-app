import { CircularProgress, CircularProgressProps, styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMyCircularProgressProps extends CircularProgressProps {}

const StyledCircularProgress = styled(CircularProgress)``;

export const DefaultCircularProgress: IMyCircularProgressProps = {};

export const MyCircularProgress = (props: IMyCircularProgressProps) => {
  return <StyledCircularProgress {...DefaultCircularProgress} {...props} />;
};
