import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, useMemo } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_GROUP } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IGroupDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListUserGroupQuery } from '../../api/userGroup';

export const UserGroupTable: FC = () => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_GROUP));
  const { data, isFetching, refetch } = useGetListUserGroupQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IGroupDTO>[]>(
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
          size: 50,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.group.name.short(),
        columnDefOptions: {
          size: 300,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'modules',
            header: translate.resources.group.module.short(),
            cell: (props) => (
              <StyledDivCenterChildren>
                {props.row.original.modules?.map((module) => module.name).join(',')}
              </StyledDivCenterChildren>
            ),
            size: 600,
          }),
      },
      {
        type: 'record',
        name: 'description',
        headerLabel: translate.resources.group.description(),
        columnDefOptions: {
          size: 700,
        },
      },
    ],
    [translate.messages, translate.resources.group],
  );

  return (
    <MyTable
      tableId={TABLE_GROUP}
      data={data?.list}
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
        <AdminTableActionButtons tableId={TABLE_GROUP} refetch={refetch} />
      )}
    />
  );
};
