import { styled } from '@mui/material';

export const StyledAdminAppModalContentWrapper = styled('div')`
  .MuiGrid-root > .MuiBox-root {
    padding-left: ${(props) => props.theme.spacing(6)};
    padding-right: ${(props) => props.theme.spacing(6)};
  }
`;
