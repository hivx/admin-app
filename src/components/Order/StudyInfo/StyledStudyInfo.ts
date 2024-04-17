import { Stack, styled, lighten } from '@mui/material';

/**
 * Make border each form
 */
export const StyledInfoFormFieldsWrapper = styled(Stack)`
  padding: ${(props) => props.theme.spacing(2)};
`;

export const StyledOrderInfoFormFieldsWrapper = styled('div')`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr auto 1fr;
  /* gap: ${(props) => props.theme.spacing(1)}; */
  border: 1px solid ${(props) => lighten(props.theme.palette.text.primary, 0.6)};
  border-radius: 3px;
`;

/**
 * Make grid order & patient form field
 */
export const StyledInfoFormFieldsMain = styled('div')`
  display: grid;
  gap: ${(prop) => prop.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1)};
`;

/**
 * Style for rows has 2 column
 */
export const StyledInfoFieldTwoColumn = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: ${(prop) => prop.theme.spacing(1)};
  align-items: center;
`;

export const StyledInfoFieldTwoOfChildrenColumn = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: ${(prop) => prop.theme.spacing(0.5)};
  align-items: center;
`;

export const StyledRequestInfoFormMain = styled('div')`
  display: grid;
  gap: ${(prop) => prop.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(1)};
`;
