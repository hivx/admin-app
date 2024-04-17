import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, useMemo } from 'react';

import { useGetListUserTypeQuery } from '@/api/userType';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_USER_TYPE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IUserTypeDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

export const UserTypeTable: FC = () => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_USER_TYPE));
  const { data, isFetching, refetch } = useGetListUserTypeQuery(query || skipToken);

  const tableColumns = useMemo<ITableField<IUserTypeDTO>[]>(
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
          size: 50,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.userType.name(),
        columnDefOptions: {
          size: 300,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'description',
            header: translate.resources.userType.description(),
            cell: (props) => <StyledDivCenterChildren> </StyledDivCenterChildren>,
            size: 600,
          }),
      },
    ],
    [translate.messages, translate.resources.userType],
  );

  return (
    <MyTable
      tableId={TABLE_USER_TYPE}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      MyDataGridProps={{
        isLoading: isFetching,
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
          tableId={TABLE_USER_TYPE}
          hideButtonAdd
          hideButtonDelete
          hideButtonEdit
          refetch={refetch}
        />
      )}
    />
  );
};
