import { FC, useMemo } from 'react';

import { useGetListUsersQuery } from '@/api/users';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_DEPARTMENT_USER } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { BaseEntity } from '@/types';
import { IUserDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

type UserTableProps = {
  departmentID: BaseEntity['id'];
};

export const DepartmentUserTable: FC<UserTableProps> = (props) => {
  const { departmentID } = props;
  const translate = useTranslate();

  const query = useAppSelector(getCurrentTableQuery(TABLE_DEPARTMENT_USER));

  const { data, isFetching, refetch } = useGetListUsersQuery({
    ...query,
    filter: { departmentID },
  });

  const tableColumns: ITableField<IUserDTO>[] = useMemo(
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
        name: 'code',
        headerLabel: translate.resources.user.code(),
        columnDefOptions: {
          size: 50,
        },
      },
      {
        type: 'record',
        name: 'fullname',
        headerLabel: translate.resources.user.fullname(),
        columnDefOptions: {
          size: 50,
        },
      },
      {
        type: 'record',
        name: 'title',
        headerLabel: translate.resources.user.title(),
        columnDefOptions: {
          size: 50,
        },
      },
    ],
    [translate.messages, translate.resources.user],
  );
  return (
    <MyTable
      tableId={TABLE_DEPARTMENT_USER}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      MyDataGridProps={{ isLoading: isFetching }}
      TanstackTableOptions={{
        enableRowSelection: false,
      }}
      renderActionButtons={() => (
        <AdminTableActionButtons
          tableId={TABLE_DEPARTMENT_USER}
          refetch={refetch}
          hideButtonAdd={true}
          hideButtonDelete={true}
          hideButtonEdit={true}
        />
      )}
    />
  );
};
