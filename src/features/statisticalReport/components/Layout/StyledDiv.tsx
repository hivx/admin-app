import { styled } from '@mui/material';

export const StyledTitle = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const StyledTableStatisticContainer = styled('div')`
  color: ${(props) => props.theme?.pacs?.customColors.text.black};
  flex-grow: 1;
`;

export const StyledSummarySectionContainer = styled('div')`
  display: flex;
  height: 100%;
  flex-direction: column;
`;
