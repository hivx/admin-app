import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, useMemo } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_MODALITY_ROOM } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IModalityRoomDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListModalityRoomQuery } from '../../api/modalityRoom';

export const ModalityRoomTable: FC = () => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_MODALITY_ROOM));
  const { data, isFetching, refetch } = useGetListModalityRoomQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IModalityRoomDTO>[]>(
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
        name: 'code',
        headerLabel: translate.resources.modalityRoom.code(),
        columnDefOptions: {
          size: 550,
        },
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.modalityRoom.name(),
        columnDefOptions: {
          size: 950,
        },
      },
    ],
    [translate.messages, translate.resources.modalityRoom],
  );

  return (
    <MyTable
      tableId={TABLE_MODALITY_ROOM}
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
        <AdminTableActionButtons tableId={TABLE_MODALITY_ROOM} refetch={refetch} />
      )}
    />
  );
};
