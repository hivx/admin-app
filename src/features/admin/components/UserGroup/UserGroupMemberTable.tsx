import { FC, useMemo } from 'react';

import { useGetListUsersQuery } from '@/api/users';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_USER_GROUP_MEMBER } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { BaseEntity } from '@/types';
import { IUserDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

type UserGroupMemberTableProps = {
  userGroupId: BaseEntity['id'];
};

export const UserGroupMemberTable: FC<UserGroupMemberTableProps> = (props) => {
  const { userGroupId } = props;
  const translate = useTranslate();

  const query = useAppSelector(getCurrentTableQuery(TABLE_USER_GROUP_MEMBER));

  const { data, isFetching, refetch } = useGetListUsersQuery({
    ...query,
    filter: { groupIDs: [userGroupId] },
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
        name: 'fullname',
        headerLabel: translate.resources.user.fullname(),
      },
      {
        type: 'record',
        name: 'code',
        headerLabel: translate.resources.user.code(),
      },
      {
        type: 'record',
        name: 'username',
        headerLabel: translate.resources.user.username(),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'department',
            header: () => translate.resources.user.department(),
            cell: (c) => c.row.original?.department?.name,
          }),
      },
      {
        type: 'record',
        name: 'type',
        headerLabel: translate.resources.group.memberObject(),
      },
      {
        type: 'record',
        name: 'enabled',
        headerLabel: translate.messages.status.long(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue()
              ? translate.resources.user.enabled()
              : translate.resources.user.disabled()}
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 250,
        },
      },
    ],
    [translate.resources.user, translate.resources.group, translate.messages.status],
  );
  return (
    <MyTable
      tableId={TABLE_USER_GROUP_MEMBER}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      MyDataGridProps={{ isLoading: isFetching }}
      TanstackTableOptions={{
        enableRowSelection: false,
        enableMultiRowSelection: false,
      }}
      renderActionButtons={() => (
        <AdminTableActionButtons
          tableId={TABLE_USER_GROUP_MEMBER}
          refetch={refetch}
          hideButtonAdd={true}
          hideButtonDelete={true}
          hideButtonEdit={true}
        />
      )}
    />
  );
};
