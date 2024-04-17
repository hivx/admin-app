import { Paper, PaperProps, styled } from '@mui/material';
import { forwardRef } from 'react';

export type IMyPaperProps = PaperProps;

const StyledPaper = styled(Paper)``;

export const MyPaperDefaults: IMyPaperProps = {
  elevation: 3,
};

export const MyPaper = forwardRef<HTMLDivElement, IMyPaperProps>(
  (props: IMyPaperProps, ref) => {
    return (
      <StyledPaper ref={ref} {...MyPaperDefaults} {...props}>
        {props.children}
      </StyledPaper>
    );
  },
);

MyPaper.displayName = 'MuiPaper';
