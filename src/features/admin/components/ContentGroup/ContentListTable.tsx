import { FC, useMemo } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_CONTENT_BY_CONTENT_GROUP } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { BaseEntity } from '@/types';
import { IContentDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListContentsQuery } from '../../../../api/content';

type UserTableProps = {
  contentGroupID: BaseEntity['id'];
};

export const ContentListTable: FC<UserTableProps> = (props) => {
  const { contentGroupID } = props;
  const translate = useTranslate();

  const query = useAppSelector(getCurrentTableQuery(TABLE_CONTENT_BY_CONTENT_GROUP));
  const { data, isFetching, refetch } = useGetListContentsQuery({
    ...query,
    filter: { groupID: contentGroupID },
  });

  const tableColumns: ITableField<IContentDTO>[] = useMemo(
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
        headerLabel: translate.resources.content.name.short(),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'user',
            header: () => translate.resources.content.user(),
            cell: (c) => c.row.original.user?.fullname,
          }),
      },
      {
        type: 'record',
        name: 'description',
        headerLabel: translate.resources.content.impression(),
      },
    ],
    [translate.messages, translate.resources.content],
  );
  return (
    <MyTable
      tableId={TABLE_CONTENT_BY_CONTENT_GROUP}
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
          tableId={TABLE_CONTENT_BY_CONTENT_GROUP}
          refetch={refetch}
          hideButtonAdd={true}
          hideButtonDelete={true}
          hideButtonEdit={true}
        />
      )}
    />
  );
};
