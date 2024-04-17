import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { ReactNode, useMemo, FC } from 'react';

import { useGetListModalityTypeNameQuery } from '@/api/modalityTypeName';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { IUserPermissions } from '@/lib/dataHelper/getUserPermissisons';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_MODALITY_TYPE_NAME } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IModalityTypeNameDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

type ModalityTypeNameTableProps = {
  FilterComponent: ReactNode;
  permission?: IUserPermissions;
};
export const ModalityTypeNameTable: FC<ModalityTypeNameTableProps> = (props) => {
  const { FilterComponent, permission } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();
  const query = useAppSelector(getCurrentTableQuery(TABLE_MODALITY_TYPE_NAME));
  const { data, isFetching, refetch } = useGetListModalityTypeNameQuery(
    query || skipToken,
  );
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IModalityTypeNameDTO>[]>(
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
          size: 150,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.modalityTypeName.name(),
        columnDefOptions: {
          size: 700,
        },
      },
      {
        type: 'record',
        name: 'description',
        headerLabel: translate.resources.modalityTypeName.description(),
        columnDefOptions: {
          size: 760,
        },
      },
    ],
    [translate.messages, translate.resources.modalityTypeName],
  );

  return (
    <StyledTableContainerWithCollapsiblePanel>
      <MyTable
        tableId={TABLE_MODALITY_TYPE_NAME}
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
            tableId={TABLE_MODALITY_TYPE_NAME}
            refetch={refetch}
          />
        )}
      />
    </StyledTableContainerWithCollapsiblePanel>
  );
};
