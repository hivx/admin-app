import { styled } from '@mui/material';

export const StyledPrimaryFieldInsideTableHeader = styled('div')`
  .MuiInputBase-input {
    // set this so that the height of input is the same as the Icon Buttons
    padding-top: 6.5px !important;
    padding-bottom: 6.5px !important;
  }
  .MuiAutocomplete-inputRoot {
    // set this so that the height of input is the same as the Icon Buttons
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
`;
