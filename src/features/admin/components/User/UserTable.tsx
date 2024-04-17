import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { ReactNode, useMemo, FC } from 'react';

import { useGetListUsersQuery } from '@/api/users';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_USER } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IUserDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

type UserTableProps = {
  FilterComponent: ReactNode;
};
export const UserTable: FC<UserTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();
  const query = useAppSelector(getCurrentTableQuery(TABLE_USER));
  const { data, isFetching, refetch } = useGetListUsersQuery(query || skipToken);
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IUserDTO>[]>(
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
          maxSize: 50,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'username',
        headerLabel: translate.resources.user.username(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'fullname',
        headerLabel: translate.resources.user.fullname(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'code',
        headerLabel: translate.resources.user.code(),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'phone',
        headerLabel: translate.resources.user.phone(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'department',
            header: () => translate.resources.user.department(),
            cell: (c) => c.row.original?.department?.name,
            size: 250,
          }),
      },

      {
        type: 'record',
        name: 'type',
        headerLabel: translate.resources.user.userType(),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'title',
        headerLabel: translate.resources.user.title(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'level',
        headerLabel: translate.resources.user.level(),
        columnDefOptions: {
          size: 50,
        },
      },
      {
        type: 'record',
        name: 'enabled',
        headerLabel: translate.messages.status.long(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue()
              ? translate.resources.user.enabled()
              : translate.resources.user.disabled()}
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 250,
        },
      },
    ],
    [translate.messages, translate.resources.user],
  );

  return (
    <StyledTableContainerWithCollapsiblePanel>
      <MyTable
        tableId={TABLE_USER}
        data={data?.list}
        FilterComponent={FilterComponent}
        tableColumnsDescription={tableColumns}
        MyDataGridProps={{
          isLoading: isFetching,
          onRowRightClick: (e) => {
            open(e);
          },
          onRowDoubleClick() {
            adminFunctions.openEditModal();
          },
        }}
        paginationControls={{
          totalRecords: data?.meta.totalRecords,
          pageSize: data?.list.length,
        }}
        TanstackTableOptions={{
          enableRowSelection: true,
          enableMultiRowSelection: false,
        }}
        renderActionButtons={() => (
          <AdminTableActionButtons tableId={TABLE_USER} refetch={refetch} />
        )}
      />
    </StyledTableContainerWithCollapsiblePanel>
  );
};
