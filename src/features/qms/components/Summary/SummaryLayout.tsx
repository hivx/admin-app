import { styled } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

import QmsHead from '@/components/Head/QmsHead';
import { ContentLayout } from '@/components/Layout/ContentLayout';

export const SummaryLayoutLayout: FC<PropsWithChildren> = (props) => {
  return (
    <StyledContainer Head={<QmsHead customTitle="Màn hình tổng hợp" />}>
      {props.children}
    </StyledContainer>
  );
};

const StyledContainer = styled(ContentLayout)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  overflow-y: hidden;
`;
