import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, useMemo } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_USER_ACTIVITY } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IUserActivityDTO } from '@/types/dto/userActivity';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListUserActivityQuery } from '../../api/userActivity';

import { UserActivityListFilterForm } from './UserActivityListFilterForm';

export const UserActivityTable: FC = () => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_USER_ACTIVITY));
  const { data, isFetching, refetch } = useGetListUserActivityQuery(query || skipToken);

  const tableColumns = useMemo<ITableField<IUserActivityDTO>[]>(
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
            minSize: FIXED_WIDTH_COLUMN_STT,
            maxSize: FIXED_WIDTH_COLUMN_STT,
          }),
      },
      {
        type: 'record',
        name: 'id',
        headerLabel: 'ID',
        renderCell: (cell) => (
          <StyledDivCenterChildren>{cell.getValue()}</StyledDivCenterChildren>
        ),
        columnDefOptions: {
          maxSize: 150,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'type',
        headerLabel: translate.resources.userActivity.type(),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'activityTime',
        headerLabel: translate.resources.userActivity.activityTime(),
        renderCell: (context) => (
          <>{itechDateTimeToDayjs(context.getValue())?.format(DISPLAY_FORMAT.dateTime)}</>
        ),
        enableSort: true,
        columnDefOptions: {
          size: 200,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'user',
            header: () => translate.resources.userActivity.fullname(),
            cell: (c) => c.row.original?.user?.fullname,
            size: 250,
          }),
      },

      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'user',
            header: () => translate.resources.userActivity.username(),
            cell: (c) => c.row.original?.user?.username,
            size: 150,
          }),
      },

      {
        type: 'record',
        name: 'remoteAddress',
        headerLabel: translate.resources.userActivity.remoteAddress(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'description',
        headerLabel: translate.resources.userActivity.description(),
        columnDefOptions: {
          size: 650,
        },
      },
    ],
    [translate.messages, translate.resources.userActivity],
  );

  return (
    <MyTable
      tableId={TABLE_USER_ACTIVITY}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      MyDataGridProps={{
        isLoading: isFetching,
      }}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
      FilterComponent={<UserActivityListFilterForm />}
      renderActionButtons={() => (
        <AdminTableActionButtons
          tableId={TABLE_USER_ACTIVITY}
          hideButtonAdd
          hideButtonDelete
          hideButtonEdit
          refetch={refetch}
        />
      )}
    />
  );
};
