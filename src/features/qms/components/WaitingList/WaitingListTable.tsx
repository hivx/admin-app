import { forwardRef, useMemo } from 'react';

import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { QMS_RESOURCES, RESOURCES } from '@/types/resources';
import { itechDateToDayjs } from '@/utils/dateUtils';

import { IMwlBase } from '../../types';

type WaitingListTableProps = {
  data: IMwlBase[];
  isFetching: boolean;
};

export const WaitingListTable = forwardRef<HTMLDivElement, WaitingListTableProps>(
  (props, ref) => {
    const { data, isFetching } = props;
    const translate = useTranslate();

    const tableColumns = useMemo<ITableField<IMwlBase>[]>(
      () => [
        {
          type: 'record',
          name: 'ticketNumber',
          headerLabel: translate.resources.ticket.ticketNumber().toUpperCase(),
          renderCell: (cell) => (
            <StyledDivCenterChildren>{cell.getValue()}</StyledDivCenterChildren>
          ),
          columnDefOptions: {
            maxSize: 50,
          },
        },
        {
          type: 'record',
          name: 'patientName',
          headerLabel: translate.resources.ticket.patientName().toUpperCase(),
          renderCell: (cell) => (
            <StyledDivCenterChildren>{cell.getValue()}</StyledDivCenterChildren>
          ),
          columnDefOptions: {
            minSize: 250,
          },
        },
        {
          type: 'record',
          name: 'birthDate',
          headerLabel: translate.resources.ticket.birthYear().toUpperCase(),
          renderCell: (cell) => (
            <StyledDivCenterChildren>
              {itechDateToDayjs(cell.getValue())?.format('YYYY')}
            </StyledDivCenterChildren>
          ),
          columnDefOptions: {
            maxSize: 50,
          },
        },
        {
          type: 'record',
          name: 'procedureCode',
          headerLabel: translate.resources.ticket.procedureCode().toUpperCase(),
          renderCell: (cell) => (
            <StyledDivCenterChildren>{cell.getValue()}</StyledDivCenterChildren>
          ),
          columnDefOptions: {
            maxSize: 50,
          },
        },
      ],
      [translate.resources],
    );

    return (
      <MyTable
        tableContainerRef={ref}
        tableId={QMS_RESOURCES.QMS_APPROVED_DIAGNOSIS}
        data={data}
        tableColumnsDescription={tableColumns}
        showPagination={false}
        showPaginationInfo={false}
        MyDataGridProps={{
          isLoading: isFetching,
        }}
        paginationControls={{
          totalRecords: 0,
          pageSize: data.length,
        }}
        TanstackTableOptions={{
          enableRowSelection: false,
          enableMultiRowSelection: false,
        }}
        sx={{ height: '100%' }}
      />
    );
  },
);

WaitingListTable.displayName = 'WaitingListTable';
