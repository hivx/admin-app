import { useMemo } from 'react';

import { useGetListConsumableQuery } from '@/api/consumable';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { TABLE_CONSUMABLE } from '@/stores/table/tableInitialState';
import { BaseEntity } from '@/types';
import { IConsumableDTO } from '@/types/dto';

/**
 * Bảng hiển thị danh sách VTTH của Dịch vụ chụp
 */
export const ConsumableDynamicPanelTable = ({
  requestID,
}: {
  requestID?: BaseEntity['id'];
}) => {
  const translate = useTranslate();

  const { data, isLoading, refetch } = useGetListConsumableQuery(
    {
      filter: { requestID },
    },
    { skip: !requestID },
  );
  const tableData = data?.list ?? [];

  const tableColumns = useMemo<ITableField<IConsumableDTO>[]>(
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
            maxSize: 50,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'material.code',
            header: translate.resources.consumable.materialCode(),
            cell: (props) => <> {props.row.original.material?.code}</>,
            maxSize: 75,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'material.name',
            header: translate.resources.consumable.materialName(),
            cell: (props) => <> {props.row.original.material?.name}</>,
            maxSize: 75,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'material.type',
            header: translate.resources.consumable.materialType(),
            cell: (props) => <> {props.row.original.material?.type?.name}</>,
            maxSize: 75,
          }),
      },
      {
        type: 'record',
        name: 'quantity',
        headerLabel: translate.resources.consumable.quantity(),
        columnDefOptions: {
          maxSize: 25,
        },
      },
    ],
    [translate],
  );

  return (
    <MyTable
      tableId={TABLE_CONSUMABLE}
      data={tableData}
      tableColumnsDescription={tableColumns}
      MyDataGridProps={{
        isLoading,
      }}
      hiddenFooter={true}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
    />
  );
};
