import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useMemo } from 'react';

import { useGetListModalityTypeQuery } from '@/api/modalityType';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_MODALITY_TYPE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IModalityTypeDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { ConnectedModalityTypeEditModal } from './ModalityTypeEditModal';

export const ModalityTypeTable: React.FC = () => {
  const adminFunctions = useAdminFunctions();
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_MODALITY_TYPE));
  const { data, isFetching, refetch } = useGetListModalityTypeQuery(query || skipToken);
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IModalityTypeDTO>[]>(
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
          maxSize: 100,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.modalityType.name(),
        columnDefOptions: {
          maxSize: 100,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'otherNames',
            header: () => translate.resources.modalityType.otherNames(),
            cell: (c) =>
              c.row.original.otherNames &&
              c.row.original.otherNames.map((item) => item).join(','),
            size: 450,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'modality',
            header: () => translate.resources.modalityType.preferredModality(),
            cell: (c) => c.row.original.preferredModality?.name,
            size: 550,
          }),
      },
      {
        type: 'record',
        name: 'requireDicom',
        headerLabel: translate.resources.modalityType.requireDicom(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue()
              ? translate.resources.modalityType.yes()
              : translate.resources.modalityType.no()}
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 500,
        },
      },
    ],
    [translate.messages, translate.resources.modalityType],
  );
  return (
    <>
      <MyTable
        tableId={TABLE_MODALITY_TYPE}
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
          <AdminTableActionButtons tableId={TABLE_MODALITY_TYPE} refetch={refetch} />
        )}
      />
      <ConnectedModalityTypeEditModal />
    </>
  );
};
