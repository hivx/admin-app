import { MenuItem, styled } from '@mui/material';

import { globalStyles } from '@/providers/ThemeProvider';

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius};
  ${globalStyles.onMenuHover};
`;
