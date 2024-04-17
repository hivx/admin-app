import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { ReactNode, useMemo, FC } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { IUserPermissions } from '@/lib/dataHelper/getUserPermissisons';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_ROLE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IRoleDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListRoleQuery } from '../../api/role';

type RoleTableProps = {
  FilterComponent: ReactNode;
  permission?: IUserPermissions;
};
export const RoleTable: FC<RoleTableProps> = (props) => {
  const { FilterComponent, permission } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();
  const query = useAppSelector(getCurrentTableQuery(TABLE_ROLE));
  const { data, isFetching, refetch } = useGetListRoleQuery(query || skipToken);
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IRoleDTO>[]>(
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
        columnDefOptions: {
          size: 200,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.role.name(),
        columnDefOptions: {
          size: 650,
        },
      },
      {
        type: 'record',
        name: 'description',
        headerLabel: translate.resources.role.description(),
        columnDefOptions: {
          size: 760,
        },
      },
    ],
    [translate.messages, translate.resources.role],
  );

  return (
    <StyledTableContainerWithCollapsiblePanel>
      <MyTable
        tableId={TABLE_ROLE}
        data={data?.list}
        FilterComponent={FilterComponent}
        tableColumnsDescription={tableColumns}
        MyDataGridProps={{
          isLoading: isFetching,
          onRowRightClick: (e) => {
            open(e);
          },
          onRowDoubleClick() {
            permission?.isSysadmin && adminFunctions.openEditModal();
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
          <AdminTableActionButtons
            disabled={!permission?.isSysadmin}
            tableId={TABLE_ROLE}
            refetch={refetch}
          />
        )}
      />
    </StyledTableContainerWithCollapsiblePanel>
  );
};
