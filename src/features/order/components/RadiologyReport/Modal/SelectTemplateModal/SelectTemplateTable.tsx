import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import { useGetListContentsQuery } from '@/api/content';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { IMyDatagridProps } from '@/components/Table/MyDatagrid';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_SELECT_TEMPLATE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IContentDTO } from '@/types/dto';

export const SelectTemplateTable = ({
  onRowClick,
}: Pick<IMyDatagridProps<IContentDTO>, 'onRowClick'>) => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_SELECT_TEMPLATE));
  const { data, isFetching } = useGetListContentsQuery(query || skipToken);

  const tableColumns = useMemo<ITableField<IContentDTO>[]>(
    () => [
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
        headerLabel: translate.resources.report.selectTemplate.templateName.long(),
      },
      {
        type: 'record',
        name: 'impression',
        headerLabel: translate.resources.content.impression(),
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
    ],
    [translate.resources.report.selectTemplate, translate.resources.content],
  );

  return (
    <MyTable
      tableId={TABLE_SELECT_TEMPLATE}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      MyDataGridProps={{
        isLoading: isFetching,
        onRowClick: onRowClick,
        hasRowClick: true,
      }}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
    />
  );
};
