import { styled, useTheme } from '@mui/material';

import { useGetSummaryStatusDataQuery } from '@/api/analytics';
import { useTranslate } from '@/hooks';
import { ANALYTIC_ID } from '@/types/dto/analytics';
import { ANALYTIC_REFETCH_INTERVAL, getSummaryOrderData } from '@/utils/analyticUtil';
import { DATE_FORMAT, DISPLAY_FORMAT, getCurrentDate } from '@/utils/dateUtils';

import { SummaryOrderItem } from './SummaryOrderItem';

/**
 * Show summary data in all type of order
 *
 */
export const SummaryOrderData = () => {
  const translate = useTranslate();
  const currentDate = getCurrentDate();
  const theme = useTheme();

  const { data } = useGetSummaryStatusDataQuery(
    {
      fromDate: currentDate.format(DATE_FORMAT),
      id: ANALYTIC_ID.STATUS_COUNT,
      toDate: currentDate.format(DATE_FORMAT),
    },
    { pollingInterval: ANALYTIC_REFETCH_INTERVAL }, //auto refetch to get real-time data
  );

  const { total, approved, notStarted, notReady } = getSummaryOrderData(data);

  return (
    <StyledContainer>
      <div>
        {translate.resources.analytics.dateStatistic({
          date: currentDate.format(DISPLAY_FORMAT.date),
        })}
      </div>
      <StyledGridContainer>
        <StyledGridItem>
          <SummaryOrderItem
            title={translate.resources.analytics.total()}
            value={total}
            color={theme.pacs?.customColors.text.black}
          />
        </StyledGridItem>
        <StyledGridItem>
          <SummaryOrderItem
            title={translate.resources.analytics.approved()}
            value={approved}
            color={theme.pacs?.customColors.text.gray}
          />
        </StyledGridItem>
        <StyledGridItem>
          <SummaryOrderItem
            title={translate.resources.analytics.notReady()}
            value={notReady}
            color={theme.pacs?.customColors.text.red}
          />
        </StyledGridItem>
        <StyledGridItem>
          <SummaryOrderItem
            title={translate.resources.analytics.notStarted()}
            value={notStarted}
            color={theme.pacs?.customColors.text.blue}
          />
        </StyledGridItem>
      </StyledGridContainer>
    </StyledContainer>
  );
};

export const StyledGridContainer = styled('div')`
  --gap: ${(props) => props.theme.spacing(3)};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap);
  justify-content: center;
  grid-template-rows: repeat(2, 1fr);
  margin-top: 10px;
  height: 100%;
  flex-grow: 1;
`;

export const StyledGridItem = styled('div')`
  width: 100%;
  height: 100%;
`;

export const StyledContainer = styled('div')`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
