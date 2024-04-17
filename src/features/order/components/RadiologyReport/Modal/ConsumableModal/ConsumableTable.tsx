import { FC, useMemo } from 'react';

import { useGetListConsumableQuery } from '@/api/consumable';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { IOrderReportKey } from '@/stores/OrderRadiology';
import { TABLE_CONSUMABLE } from '@/stores/table/tableInitialState';
import { IConsumableDTO } from '@/types/dto';

import { ConsumableActionButtons } from './ConsumableActionButtons';

/**
 * Bảng hiển thị danh sách VTTH của Dịch vụ chụp
 */
export const ConsumableTable: FC<IOrderReportKey> = ({ orderID, requestID }) => {
  const translate = useTranslate();

  const { data, isLoading, refetch } = useGetListConsumableQuery({
    filter: { requestID },
  });
  const tableData = data?.list ?? [];

  const tableColumns = useMemo<ITableField<IConsumableDTO>[]>(
    () => [
      // {
      //   type: 'custom',
      //   getColumnDef: (columnHelper) =>
      //     columnHelper.display({
      //       id: 'stt',
      //       header: translate.messages.stt(),
      //       cell: (props) => (
      //         <StyledDivCenterChildren>{props.row.index + 1}</StyledDivCenterChildren>
      //       ),
      //       maxSize: 50,
      //     }),
      // },
      // {
      //   type: 'custom',
      //   getColumnDef: (columnHelper) =>
      //     columnHelper.display({
      //       id: 'material.code',
      //       header: translate.resources.consumable.materialCode(),
      //       cell: (props) => <> {props.row.original.material?.code}</>,
      //       maxSize: 100,
      //     }),
      // },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'material.name',
            header: translate.resources.consumable.materialName(),
            cell: (props) => <> {props.row.original.material?.name}</>,
            maxSize: 100,
          }),
      },
      // {
      //   type: 'custom',
      //   getColumnDef: (columnHelper) =>
      //     columnHelper.display({
      //       id: 'material.type',
      //       header: translate.resources.consumable.materialType(),
      //       cell: (props) => <> {props.row.original.material?.type?.name}</>,
      //       maxSize: 100,
      //     }),
      // },
      {
        type: 'record',
        name: 'quantity',
        headerLabel: translate.resources.consumable.quantity(),
        columnDefOptions: {
          maxSize: 100,
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
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
      hiddenFooter
      renderActionButtons={() => <ConsumableActionButtons refetch={refetch} />}
    />
  );
};
