import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { FC, useMemo } from 'react';

import { useGetListConfigQuery } from '@/api/config';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_CONFIG } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IConfigDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

/**
 * Config table
 */
export const ConfigListTable: FC = () => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_CONFIG));
  const { open } = useContextMenu();
  const adminFunctions = useAdminFunctions();

  const { data, isFetching, refetch } = useGetListConfigQuery(query || skipToken);

  const tableColumns = useMemo<ITableField<IConfigDTO>[]>(
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
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'attribute',
            header: () => translate.resources.config.attributeID(),
            cell: (c) => c.row.original?.attribute?.id,
            size: 250,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'attribute',
            header: () => translate.resources.config.attributeName(),
            cell: (c) => c.row.original?.attribute?.name,
            size: 250,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'attribute',
            header: () => translate.resources.config.attributeDatatype(),
            cell: (c) => c.row.original?.attribute?.datatype,
            size: 250,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'attributeValue',
            header: () => translate.resources.config.attributeValue(),
            cell: (c) => c.row.original?.attributeValue,
            size: 250,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'preferred',
            header: () => translate.resources.config.preferred(),
            cell: (c) => (
              <StyledDivCenterChildren>
                {c.row.original?.preferred
                  ? translate.resources.config.preferred()
                  : translate.messages.no()}
              </StyledDivCenterChildren>
            ),
            size: 150,
          }),
      },
    ],
    [translate.messages, translate.resources.config],
  );

  return (
    <MyTable
      tableId={TABLE_CONFIG}
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
        <AdminTableActionButtons tableId={TABLE_CONFIG} refetch={refetch} />
      )}
    />
  );
};
