import { Typography } from '@mui/material';
import { FC, useMemo } from 'react';

import { useGetSummaryModalityDataQuery } from '@/api/analytics';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { TABLE_SUMMARY_MODALITY } from '@/stores/table/tableInitialState';
import { ANALYTIC_ID, ISummaryModalityDataFieldDTO } from '@/types/dto/analytics';
import { ANALYTIC_REFETCH_INTERVAL } from '@/utils/analyticUtil';
import { DATE_FORMAT, DISPLAY_FORMAT, getCurrentDate } from '@/utils/dateUtils';

import {
  StyledSummarySectionContainer,
  StyledTableStatisticContainer,
  StyledTitle,
} from './Layout/StyledDiv';

/**
 * Show summary number of order for each modality
 */
export const SummaryModalityTable: FC = () => {
  const translate = useTranslate();
  const currentDate = getCurrentDate();
  const { data, isFetching } = useGetSummaryModalityDataQuery(
    {
      fromDate: currentDate.format(DATE_FORMAT),
      id: ANALYTIC_ID.MODALITY_COUNT,
      toDate: currentDate.format(DATE_FORMAT),
    },
    { pollingInterval: ANALYTIC_REFETCH_INTERVAL },
  );

  const tableColumns = useMemo<ITableField<ISummaryModalityDataFieldDTO>[]>(
    () => [
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'stt',
            header: translate.messages.stt(),
            cell: (props) => (
              <StyledDivCenterChildren>{props.row.index + 1}</StyledDivCenterChildren>
            ),
            maxSize: 50,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'modalityName',
            header: translate.resources.analytics.modalityName(),
            cell: (props) => <Typography>{props.row.original.modality.name}</Typography>,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'modalityType',
            header: translate.resources.analytics.modalityType(),
            cell: (props) => (
              <Typography>{props.row.original.modality.modalityType}</Typography>
            ),
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'insurance',
            header: translate.resources.analytics.insurance(),
            cell: (props) => <Typography>{props.row.original.insurance}</Typography>,
          }),
      },

      {
        type: 'record',
        name: 'total',
        headerLabel: translate.resources.analytics.totalRequest(),
      },
    ],
    [translate.messages, translate.resources.analytics],
  );

  return (
    <StyledSummarySectionContainer>
      <StyledTitle>
        <span>{translate.resources.analytics.statisticModality()}</span>
        <span>
          {translate.resources.analytics.dateStatistic({
            date: currentDate.format(DISPLAY_FORMAT.date),
          })}
        </span>
      </StyledTitle>
      <StyledTableStatisticContainer>
        <MyTable
          tableId={TABLE_SUMMARY_MODALITY}
          data={data}
          tableColumnsDescription={tableColumns}
          MyDataGridProps={{
            isLoading: isFetching,
          }}
          TanstackTableOptions={{
            enableRowSelection: false,
            enableMultiRowSelection: false,
          }}
          hiddenFooter
        />
      </StyledTableStatisticContainer>
    </StyledSummarySectionContainer>
  );
};
