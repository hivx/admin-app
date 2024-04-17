import { styled } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, ReactNode, useMemo } from 'react';

import { MyButton } from '@/components';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useNotifyModal } from '@/providers/NotificationProvider';
import { TABLE_CONTENT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IContentDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListContentsQuery } from '../../../../api/content';

type ContentTableProps = {
  FilterComponent: ReactNode;
};
export const ContentTable: FC<ContentTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const query = useAppSelector(getCurrentTableQuery(TABLE_CONTENT));
  const { data, isFetching, refetch } = useGetListContentsQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IContentDTO>[]>(
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
        headerLabel: translate.resources.content.name.short(),
        columnDefOptions: {
          size: 600,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'user',
            header: () => translate.resources.content.user(),
            cell: (c) => c.row.original.user?.fullname,
            size: 150,
          }),
      },
      {
        type: 'record',
        name: 'impression',
        headerLabel: translate.resources.content.impression(),
        columnDefOptions: {
          size: 850,
        },
      },
    ],
    [translate.messages, translate.resources.content],
  );

  return (
    <MyTable
      tableId={TABLE_CONTENT}
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
        <AdminTableActionButtons tableId={TABLE_CONTENT} refetch={refetch} />
      )}
    />
  );
};

const StyleTextButton = styled(MyButton)`
  border: 0;
  &:hover {
    border: 0;
  }
`;
