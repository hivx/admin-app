import { styled } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, useEffect, useMemo } from 'react';

import { MyButton } from '@/components';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useNotifyModal } from '@/providers/NotificationProvider';
import { AppDispatch } from '@/stores/redux';
import { TABLE_TICKET } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { IGetManyResourcesQuery } from '@/types';
import { itechDateToDayjs } from '@/utils/dateUtils';

import { useGetListTicketQuery } from '../../api/ticket';
import { ISearchTicketFilter, ITicketDTO, TICKET_STEP_STATUS } from '../../types/ticket';

import { ticketStatusWithLabel } from './TicketListFilterForm';

/**
 * check if not exist filter ,set default table filter
 */
const checkTicketQuery = (
  dispatch: AppDispatch,
  query?: IGetManyResourcesQuery<ISearchTicketFilter>,
) => {
  if (!query) return false;
  const { filter } = query;
  if (Object.keys(filter).length === 0) {
    dispatch(
      setTableFilter({
        tableId: TABLE_TICKET,
        filter: { status: TICKET_STEP_STATUS.STARTED },
        merge: true,
      }),
    );
  }
  return query;
};
/**
 * 5000 = 5s -- time to auto refetch
 */
const POLLING_INTERVAL = 5000;

const getStatusText = (status: TICKET_STEP_STATUS) => {
  return ticketStatusWithLabel[status].label;
};

export const TicketTable: FC = () => {
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const dispatch = useAppDispatch();
  const query = useAppSelector(getCurrentTableQuery<ISearchTicketFilter>(TABLE_TICKET));

  const exectQuery = checkTicketQuery(dispatch, query);

  const { data, isFetching } = useGetListTicketQuery(
    exectQuery ? exectQuery : skipToken,
    {
      pollingInterval: POLLING_INTERVAL,
    },
  );

  const tableColumns = useMemo<ITableField<ITicketDTO>[]>(
    () => [
      {
        type: 'record',
        name: 'id',
        headerLabel: 'ID',
        renderCell: (cell) => (
          <StyledDivCenterChildren>{cell.row.index + 1}</StyledDivCenterChildren>
        ),
        columnDefOptions: {
          maxSize: 50,
          size: 10,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'ticketNumber',
        headerLabel: 'Số phiếu',
        columnDefOptions: {
          size: 50,
        },
      },
      {
        type: 'record',
        name: 'pid',
        headerLabel: 'Mã bệnh nhân',
        columnDefOptions: {
          size: 50,
        },
      },
      {
        type: 'record',
        name: 'patientName',
        headerLabel: 'Tên bệnh nhân',
        columnDefOptions: {
          size: 100,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'birthDate',
            header: () => 'Năm sinh',
            cell: (c) => {
              return itechDateToDayjs(c.row.original.birthDate)?.format('YYYY');
            },
            size: 50,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'modality',
            header: () => 'Tên phòng',
            cell: (c) => {
              return c.row.original.modality?.roomName;
            },
            size: 50,
          }),
      },
      {
        type: 'record',
        name: 'status',
        headerLabel: 'Trạng thái',
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {getStatusText(cell.getValue())}
          </StyledDivCenterChildren>
        ),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'ticketProcedures',
            header: () => 'Chỉ định',
            cell: (c) => {
              return c.row.original.ticketProcedures
                ?.map((item) => item.procedureName)
                .join('\n');
            },
            size: 600,
          }),
      },
    ],
    [],
  );

  return (
    <MyTable
      tableId={TABLE_TICKET}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      MyDataGridProps={{
        isLoading: isFetching,
        hasRowClick: true,
      }}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
    />
  );
};

const StyleTextButton = styled(MyButton)`
  border: 0;
  &:hover {
    border: 0;
  }
`;
