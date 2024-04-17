import { CellContext, Table } from '@tanstack/react-table';
import { FC, useMemo, useRef, useState } from 'react';

import { MyTextField } from '@/components';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import {
  ConsumableMaterialWithQuantity,
  useGetDataForUpdateConsumableTable,
} from '@/hooks/Consumable/useGetDataForUpdateConsumableTable';
import { useUpdateRequestConsumable } from '@/hooks/Consumable/useUpdateRequestConsumable';
import { selectRadiologyReportIsEditable } from '@/stores/OrderRadiology';
import { TABLE_CONSUMABLE_CREATE } from '@/stores/table/tableInitialState';
import { BaseEntity } from '@/types';
import { IOrderRequestDTO } from '@/types/dto';

/**
 * Ô số lượng,
 * có thể edit giá trị
 */
const QuantityCell: FC<
  CellContext<ConsumableMaterialWithQuantity, unknown> & {
    requestID: BaseEntity['id'];
    orderID: BaseEntity['id'];
    disabled?: boolean;
  }
> = ({ row, column, table, cell, requestID, orderID, disabled }) => {
  const onChangeConsumable = useUpdateRequestConsumable({ requestID, orderID });

  const initialValue = cell.row.original.quantity;

  const [value, setValue] = useState(initialValue);
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
    onChangeConsumable({
      consumableData: cell.row.original,
      newQuantity: value && !Number.isNaN(value) ? value : 0,
      oldQuantity: initialValue ?? 0,
    });
  };
  return (
    <MyTextField
      type="number"
      InputProps={{
        value: value as number,
        onBlur: onBlur,
        disabled,
      }}
      inputProps={{ min: 0 }}
      onChange={(e) => {
        setValue(parseInt(e.target.value));
      }}
      sx={{ height: '25px' }}
    />
  );
};

/**
 * Bảng hiển thị danh sách các loại VTTH,
 * có thể chỉnh sửa số lượng của từng loại cho request
 */
export const CreateUpdateConsumableTable = ({
  requestID,
  orderID,
  request,
}: {
  requestID: BaseEntity['id'];
  orderID: BaseEntity['id'];
  request?: IOrderRequestDTO;
}) => {
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(orderID));

  const translate = useTranslate();
  const { isLoading, dataForTable } = useGetDataForUpdateConsumableTable({
    request,
    modalityType: request?.modality?.modalityType ?? null,
  });
  const tableRef = useRef<Table<ConsumableMaterialWithQuantity>>();
  const tableColumns = useMemo<ITableField<ConsumableMaterialWithQuantity>[]>(
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
      // {
      //   type: 'record',
      //   name: 'code',
      //   headerLabel: translate.resources.consumable.materialCode(),
      //   columnDefOptions: {
      //     maxSize: 100,
      //   },
      // },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'name',
            header: translate.resources.consumable.materialName(),
            cell: (props) => <>{props.row.original.name}</>,
            maxSize: 150,
          }),
      },
      // {
      //   type: 'custom',
      //   getColumnDef: (columnHelper) =>
      //     columnHelper.display({
      //       id: 'type',
      //       header: translate.resources.consumable.materialType(),
      //       cell: (props) => <>{props.row.original.type?.id}</>,
      //       maxSize: 100,
      //     }),
      // },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'quantity',
            header: translate.resources.consumable.quantity(),
            cell: (cellContext) => (
              <QuantityCell
                {...cellContext}
                requestID={requestID}
                orderID={orderID}
                disabled={!isEditable}
              />
            ),
            maxSize: 100,
          }),
      },
    ],
    [isEditable, orderID, requestID, translate.messages, translate.resources.consumable],
  );

  return (
    <MyTable
      tableRef={tableRef}
      tableId={TABLE_CONSUMABLE_CREATE}
      data={dataForTable}
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
