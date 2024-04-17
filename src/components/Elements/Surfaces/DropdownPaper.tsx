import { styled } from '@mui/material';
import { forwardRef } from 'react';

import { MyPaper, IMyPaperProps } from './MyPaper';

const StyledPaper = styled(MyPaper)`
  background: ${(props) => props.theme.palette.background.paper};
`;

export const DropdownPaper = forwardRef<HTMLDivElement, IMyPaperProps>(
  (props: IMyPaperProps, ref) => {
    return (
      <StyledPaper ref={ref} elevation={8} {...props}>
        {props.children}
      </StyledPaper>
    );
  },
);

DropdownPaper.displayName = 'DropdownPaper';
