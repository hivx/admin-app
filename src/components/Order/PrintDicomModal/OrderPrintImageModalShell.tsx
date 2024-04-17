import { Box, Stack, styled } from '@mui/material';
import { ReactNode } from 'react';

import { MyDivider } from '@/components';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';

type OrderPrintImageModalShellProps = {
  Title: ReactNode;
  MainContent: ReactNode;
};
export const OrderPrintImageModalShell = (props: OrderPrintImageModalShellProps) => {
  const { MainContent, Title } = props;
  return (
    <Stack height={'100%'}>
      <StyledTitle width={'100%'} height={'5%'}>
        <StyledDivCenterChildren>{Title}</StyledDivCenterChildren>
        <MyDivider />
      </StyledTitle>
      {MainContent}
    </Stack>
  );
};

const StyledTitle = styled(Box)`
  background-color: ${(props) => props.theme.pacs?.customColors.tableHeaderBackground};
`;
