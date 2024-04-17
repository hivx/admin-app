import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, ReactNode, useMemo } from 'react';

import { useGetListDepartmentsQuery } from '@/api/departments';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_DEPARTMENT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IDepartmentDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

type DepartmentTableProps = {
  FilterComponent: ReactNode;
};

export const DepartmentTable: FC<DepartmentTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_DEPARTMENT));
  const { data, isFetching, refetch } = useGetListDepartmentsQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IDepartmentDTO>[]>(
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
        name: 'name',
        headerLabel: translate.resources.department.name(),
        columnDefOptions: {
          size: 450,
        },
      },
      {
        type: 'record',
        name: 'code',
        headerLabel: translate.resources.department.code(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'parent',
            header: () => translate.resources.department.parent(),
            cell: (c) => c.row.original.parent?.name,
            size: 450,
          }),
      },
      {
        type: 'record',
        name: 'enabled',
        headerLabel: translate.messages.status.long(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue()
              ? translate.resources.department.enabled()
              : translate.resources.department.disabled()}
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 450,
        },
      },
    ],
    [translate.messages, translate.resources.department],
  );

  return (
    <MyTable
      tableId={TABLE_DEPARTMENT}
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
        <AdminTableActionButtons tableId={TABLE_DEPARTMENT} refetch={refetch} />
      )}
    />
  );
};
