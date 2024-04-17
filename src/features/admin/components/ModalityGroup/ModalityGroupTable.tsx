import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, useMemo } from 'react';

import { useGetListModalityGroupQuery } from '@/api/modalityGroup';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_MODALITY_GROUP } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IModalityGroupDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

export const ModalityGroupTable: FC = () => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_MODALITY_GROUP));
  const { data, isFetching, refetch } = useGetListModalityGroupQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IModalityGroupDTO>[]>(
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
        headerLabel: translate.resources.modalityGroup.name(),
        columnDefOptions: {
          size: 400,
        },
      },
      {
        type: 'record',
        name: 'code',
        headerLabel: translate.resources.modalityGroup.code(),
        columnDefOptions: {
          size: 160,
        },
      },
      {
        type: 'record',
        name: 'index',
        headerLabel: translate.resources.modalityGroup.index(),
        columnDefOptions: {
          size: 160,
        },
      },
      {
        type: 'record',
        name: 'description',
        headerLabel: translate.resources.modalityGroup.description(),
        columnDefOptions: {
          size: 850,
        },
      },
    ],
    [translate.messages, translate.resources.modalityGroup],
  );
  return (
    <StyledTableContainerWithCollapsiblePanel>
      <MyTable
        tableId={TABLE_MODALITY_GROUP}
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
          <AdminTableActionButtons tableId={TABLE_MODALITY_GROUP} refetch={refetch} />
        )}
      />
    </StyledTableContainerWithCollapsiblePanel>
  );
};
