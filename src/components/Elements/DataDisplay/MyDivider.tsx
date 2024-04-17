import { Divider, DividerProps, styled } from '@mui/material';

type IMyDividerProps = DividerProps;

const StyledDivider = styled(Divider)``;

export const MyDividerDefaults: IMyDividerProps = {
  sx: { maxWidth: '100%' },
};

export const MyDivider = (props: IMyDividerProps) => (
  <StyledDivider {...MyDividerDefaults} {...props} />
);
