import { FC, useMemo } from 'react';

import { useGetSummaryApproverDataQuery } from '@/api/analytics';
import { useGetListModalityTypeQuery } from '@/api/modalityType';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { TABLE_SUMMARY_RADIOLOGIST } from '@/stores/table/tableInitialState';
import { ANALYTIC_ID, ISummaryApproverDataTableField } from '@/types/dto/analytics';
import {
  ANALYTIC_REFETCH_INTERVAL,
  getSummaryApproverDataTable,
} from '@/utils/analyticUtil';
import { DATE_FORMAT, DISPLAY_FORMAT, getCurrentDate } from '@/utils/dateUtils';

import {
  StyledSummarySectionContainer,
  StyledTableStatisticContainer,
  StyledTitle,
} from './Layout/StyledDiv';

/**
 * Show summary number of order for each radiologist and each modality type
 */
export const SummaryRadiologistTable: FC = () => {
  const translate = useTranslate();
  const currentDate = getCurrentDate();
  const { data, isFetching } = useGetSummaryApproverDataQuery(
    {
      fromDate: currentDate.format(DATE_FORMAT),
      id: ANALYTIC_ID.APPROVER_COUNT,
      toDate: currentDate.format(DATE_FORMAT),
    },
    { pollingInterval: ANALYTIC_REFETCH_INTERVAL },
  );

  const { data: modalityTypeData } = useGetListModalityTypeQuery({
    filter: {},
  });
  const { dataTable, listHeaderModalityType } = getSummaryApproverDataTable(
    data,
    modalityTypeData?.list,
  );

  // gen column from list modalityType
  const modalityTypeCell: ITableField<ISummaryApproverDataTableField>[] =
    listHeaderModalityType.map((modalityType: string) => ({
      type: 'custom',
      getColumnDef: (columnHelper) =>
        columnHelper.display({
          id: modalityType,
          header: () => modalityType,
          cell: (c) => c.row.original[modalityType] || 0,
          maxSize: 40,
        }),
    }));

  const tableColumns = useMemo<ITableField<ISummaryApproverDataTableField>[]>(
    () => [
      {
        type: 'record',
        name: 'approverName',
        headerLabel: translate.resources.analytics.approverNameTitle(),
        renderCell: (cell) =>
          translate.resources.analytics.approverName({ name: cell.getValue() }),
      },
      ...modalityTypeCell,
      {
        type: 'record',
        name: 'total',
        headerLabel: translate.resources.analytics.totalRequest(),
        columnDefOptions: {
          maxSize: 50,
        },
      },
    ],
    [translate.resources.analytics, modalityTypeCell],
  );

  return (
    <StyledSummarySectionContainer>
      <StyledTitle>
        <span>{translate.resources.analytics.statisticApprover()}</span>
        <span>
          {translate.resources.analytics.dateStatistic({
            date: currentDate.format(DISPLAY_FORMAT.date),
          })}
        </span>
      </StyledTitle>
      <StyledTableStatisticContainer>
        <MyTable
          tableId={TABLE_SUMMARY_RADIOLOGIST}
          data={dataTable}
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
