import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, ReactNode, useMemo } from 'react';

import { useGetListLayoutQuery } from '@/api/layout';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_LAYOUT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { ILayoutDTO } from '@/types/dto/layout';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

type LayoutTableProps = {
  FilterComponent: ReactNode;
};
export const LayoutTable: FC<LayoutTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_LAYOUT));
  const { data, isFetching, refetch } = useGetListLayoutQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<ILayoutDTO>[]>(
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
        name: 'name',
        headerLabel: translate.resources.layout.name.short(),
        columnDefOptions: {
          size: 450,
        },
      },
      {
        type: 'record',
        name: 'modalityType',
        headerLabel: translate.resources.layout.modalityType(),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'description',
        headerLabel: translate.resources.layout.description(),
        columnDefOptions: {
          size: 650,
        },
      },
      {
        type: 'record',
        name: 'format',
        headerLabel: translate.resources.layout.format(),
        columnDefOptions: {
          size: 300,
        },
      },
    ],
    [translate.messages, translate.resources.layout],
  );

  return (
    <MyTable
      tableId={TABLE_LAYOUT}
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
        <AdminTableActionButtons tableId={TABLE_LAYOUT} refetch={refetch} />
      )}
    />
  );
};
