import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, ReactNode, useMemo } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_CONTENT_GROUP } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IContentGroupDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListContentGroupsQuery } from '../../../../api/contentGroup';
type ContentGroupTableProps = {
  FilterComponent: ReactNode;
};
export const ContentGroupTable: FC<ContentGroupTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_CONTENT_GROUP));
  const { data, isFetching, refetch } = useGetListContentGroupsQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IContentGroupDTO>[]>(
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
        headerLabel: translate.resources.contentGroup.name(),
        columnDefOptions: {
          size: 550,
        },
      },
      {
        type: 'record',
        name: 'modalityType',
        headerLabel: translate.resources.contentGroup.modalityType(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'description',
        headerLabel: translate.resources.contentGroup.description(),
        columnDefOptions: {
          size: 750,
        },
      },
    ],
    [translate.messages, translate.resources.contentGroup],
  );

  return (
    <MyTable
      tableId={TABLE_CONTENT_GROUP}
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
        <AdminTableActionButtons tableId={TABLE_CONTENT_GROUP} refetch={refetch} />
      )}
    />
  );
};
