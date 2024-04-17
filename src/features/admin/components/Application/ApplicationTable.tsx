import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import { useGetListApplicationsQuery } from '@/api/application';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { MyTable, ITableField } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_APPLICATION } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IApplicationDTO } from '@/types/dto/application';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

/**
 * Component ApplicationTable
 */
export const ApplicationTable = () => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_APPLICATION));
  const { data, isFetching, refetch } = useGetListApplicationsQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IApplicationDTO>[]>(
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
        name: 'type',
        headerLabel: translate.resources.application.type(),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.application.name(),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'url',
        headerLabel: translate.resources.application.url(),
        columnDefOptions: {
          size: 350,
        },
      },
      {
        type: 'record',
        name: 'secret',
        headerLabel: translate.resources.application.secret(),
        columnDefOptions: {
          size: 200,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'preferred',
            header: () => translate.resources.application.preferred(),
            cell: (c) => (
              <StyledDivCenterChildren>
                {c.row.original?.enabled
                  ? translate.resources.application.preferred()
                  : 'Không'}
              </StyledDivCenterChildren>
            ),
            size: 100,
          }),
      },
    ],
    [translate.messages, translate.resources.application],
  );

  return (
    <>
      <MyTable
        tableId={TABLE_APPLICATION}
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
          <AdminTableActionButtons tableId={TABLE_APPLICATION} refetch={refetch} />
        )}
      />
    </>
  );
};
