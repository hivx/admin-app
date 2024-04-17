import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, ReactNode, useMemo } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_MODALITY } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IModalityDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListModalityQuery } from '../../../../api/modality';

type ModalityTableProps = {
  FilterComponent: ReactNode;
};
export const ModalityTable: FC<ModalityTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_MODALITY));
  const { data, isFetching, refetch } = useGetListModalityQuery(query || skipToken);
  const { open } = useContextMenu();
  const adminFunctions = useAdminFunctions();

  const tableColumns: ITableField<IModalityDTO>[] = useMemo(
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
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.modality.name.short(),
        columnDefOptions: {
          size: 350,
        },
      },
      {
        type: 'record',
        name: 'code',
        headerLabel: translate.resources.modality.code.short(),
        columnDefOptions: {
          size: 150,
        },
      },

      {
        type: 'record',
        name: 'modalityType',
        headerLabel: translate.resources.modality.modalityType.short(),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'group',
            header: () => translate.resources.modality.group.short(),
            cell: (props) => props.row.original?.group?.description ?? null,
            size: 200,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'room',
            header: () => translate.resources.modality.room.short(),
            cell: (props) => props.row.original?.room?.name ?? null,
            size: 400,
          }),
      },
      {
        type: 'record',
        name: 'enabled',
        headerLabel: translate.messages.status.long(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue()
              ? translate.resources.modality.enabled()
              : translate.resources.modality.disabled()}
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 400,
        },
      },
    ],
    [translate.messages, translate.resources.modality],
  );

  return (
    <StyledTableContainerWithCollapsiblePanel>
      <MyTable
        tableId={TABLE_MODALITY}
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
          pageSize: data?.list?.length,
        }}
        TanstackTableOptions={{
          enableRowSelection: true,
          enableMultiRowSelection: false,
        }}
        renderActionButtons={() => (
          <AdminTableActionButtons tableId={TABLE_MODALITY} refetch={refetch} />
        )}
        sx={{ height: '100%' }}
      />
    </StyledTableContainerWithCollapsiblePanel>
  );
};
