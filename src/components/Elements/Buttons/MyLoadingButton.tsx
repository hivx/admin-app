import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { styled } from '@mui/material';

interface MyLoadingButtonProps extends LoadingButtonProps {
  // custom props goes here
  custom?: string;
}

const StyledButton = styled(LoadingButton)`
  /* box-shadow: 'none';
  border-radius: 0; */
`;

export const MyLoadingButton = (props: MyLoadingButtonProps) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
