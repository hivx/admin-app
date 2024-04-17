import { styled } from '@mui/material';

/**
 * Wrapper component to use in a page with DynamicSidebar
 * It will make the main component grow as much as possible to fit
 * with the dynamic size of DynamicSidebar
 */
export const DynamicSidepanelWrapper = styled('div')`
  display: grid;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  grid-template-columns: 1fr auto;
  gap: ${(props) => props.theme.spacing(0.5)};
  padding: ${(props) => props.theme.spacing(1)};
  padding-right: 0;
`;
