import { LoadingButton } from '@mui/lab';
import { FormControlLabel, styled } from '@mui/material';

import { MyButton } from '@/components';

export const StyledFormControlLabel = styled(FormControlLabel)`
  margin-left: 0px;
  margin-right: 0px;
  width: 100%;
  &.Mui-disabled {
    color: rgba(0, 0, 0, 0.38);
  }
`;

export const StyledSubmitButton = styled(MyButton)`
  padding: 6px 16px;
  margin-top: 28px;
`;

export const StyledLoadingButton = styled(LoadingButton)`
  margin-top: 28px;
`;
