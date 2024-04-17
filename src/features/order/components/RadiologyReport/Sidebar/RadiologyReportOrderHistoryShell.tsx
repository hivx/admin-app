import { styled } from '@mui/material';
import { FC } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useTranslate } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';

import { StudyHistory } from '../../../../../components/Order/DynamicPanel/StudyHistory/StudyHistory';
import { useCurrentOrderID } from '../../../providers';

export const RadiologyReportOrderHistory: FC = () => {
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const { data: order, isFetching } = useGetOneOrderQuery({ id: orderID });
  return (
    <StyledContainer>
      <Header>{translate.studyInfo.studyHistory()}</Header>
      <StyledContentContainer>
        {order && !isFetching ? <StudyHistory order={order} /> : <FullPageSpinner />}
      </StyledContentContainer>
    </StyledContainer>
  );
};

const Header = styled('div')`
  ${globalStyles.sidebarHeader};
  ${globalStyles.centerChildren};
  text-transform: uppercase;
`;

const StyledContainer = styled('div')`
  max-width: 100%;
  height: 100%;
`;

const StyledContentContainer = styled('div')`
  height: 100%;
  overflow-y: auto;
`;
