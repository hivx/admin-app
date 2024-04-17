import { styled } from '@mui/material';

import { MyFormGroupUnstyled } from './MyFormGroupUnstyled';

/**
 * Since form inside table will have position absolute
 * We need the form element to expand to parent width/height
 */
export const TableFooterFormGroup = styled(MyFormGroupUnstyled)`
  width: 100%;
  height: 100%;
  form {
    width: 100%;
    height: 100%;
  }
`;
