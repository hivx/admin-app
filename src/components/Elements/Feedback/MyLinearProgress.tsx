import { LinearProgress, LinearProgressProps, styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMyLinearProgressProps extends LinearProgressProps {}

const StyledLinearProgress = styled(LinearProgress)``;

export const DefaultLinearProgress: IMyLinearProgressProps = {};

export const MyLinearProgress = (props: IMyLinearProgressProps) => {
  return <StyledLinearProgress {...DefaultLinearProgress} {...props} />;
};
