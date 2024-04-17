import { styled } from '@mui/material';

import { MyButton } from '@/components';
import { MyFormGroupUnstyled } from '@/components/Form';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';

export const StyledLoginContainer = styled('div')`
  padding: ${(props) => props.theme.spacing(1)};
  min-width: 515px;
  min-height: 400px;
  width: 37vw; // 515px / 1366px
  height: 52vh; // 400px / 768px
  display: flex;
  border-radius: 3px;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: ${(props) => props.theme.palette.background.paper};
  ${(props) => props.theme.breakpoints.down('sm')} {
    min-width: 100%;
    min-height: 400px;
    background: transparent;
    color: white;
  }
`;

export const StyledLoginButton = styled(MyButton)`
  margin: ${(props) => props.theme.spacing(1)};
  width: 40%;
  min-height: 30px;
`;

export const StyledLoginForm = styled(MyFormGroupUnstyled)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 75%;
  & > div {
    margin: ${(props) => props.theme.spacing(1)};
  }
  ${(props) => props.theme.breakpoints.down('sm')} {
    width: 100%;
    color: white !important;
    .MuiInputBase-root {
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
` as typeof MyFormGroupUnstyled; // preserve Generic Type <SubmitPayload> of MyFormGroupUnstyled

export const StyledLoginLogo = styled('div')`
  height: 25%;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledMessage = styled(StyledDivCenterChildren)`
  width: 100%;
  height: 5%;
`;
