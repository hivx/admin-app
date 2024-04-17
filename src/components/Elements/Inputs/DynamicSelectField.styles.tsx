import { styled } from '@mui/material';

import { globalStyles } from '@/providers/ThemeProvider';

import { MySelect } from './MySelect';
import { MyTextField } from './MyTextField';

export const StyledSelectField = styled(MySelect)`
  ${globalStyles.onMenuHover};
  margin-top: 1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  height: 30px;
  position: absolute;
  top: -6px;
  width: 100%;
  z-index: 1;
  &.Mui-disabled {
    background-color: transparent;
  }
`;

export const StyledTextField = styled(MyTextField)(() => ({
  '& fieldset': {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderTop: '1px solid transparent',
  },
}));
