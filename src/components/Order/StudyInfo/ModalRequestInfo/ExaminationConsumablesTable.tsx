import { Typography, styled } from '@mui/material';
import { CellContext, Table } from '@tanstack/react-table';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { MyTextField } from '@/components';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import {
  ConsumableMaterialWithQuantity,
  useGetDataForUpdateConsumableTable,
} from '@/hooks/Consumable/useGetDataForUpdateConsumableTable';
import { IConsumableUpdateDTO, IModalityDTO, IOrderRequestDTO } from '@/types/dto';

import { RequestFormFields } from './RequestFormFields';

const TABLE_EXAMINATION_CONSUMABLES = 'table-examination-consumables';
/**
 * Ô số lượng,
 * có thể edit giá trị
 */
const QuantityCell: FC<
  CellContext<ConsumableMaterialWithQuantity, unknown> & {
    disabled?: boolean;
    setValue: UseFormSetValue<RequestFormFields>;
    watch: UseFormWatch<RequestFormFields>;
    request: IOrderRequestDTO | undefined;
  }
> = ({ row, column, table, cell, disabled, watch, setValue }) => {
  const initialValue = cell.row.original.quantity;
  const [quantityValue, setQuantityValue] = useState(
    watch('consumables')?.find((item) => item.materialID === row.original.materialID)
      ?.quantity ??
      initialValue ??
      0,
  );

  const onUpdateQuantity = useCallback(
    (consumableUpdateData: IConsumableUpdateDTO) => {
      const consumablesValue = watch('consumables') ?? [];
      const isDataOfConsumablesValue = consumablesValue
        ? consumablesValue
            .map((item) => item.materialID)
            .includes(consumableUpdateData.materialID)
        : false;

      const valueSubmit = isDataOfConsumablesValue
        ? [
            ...consumablesValue.filter(
              (item) => item.materialID !== consumableUpdateData.materialID,
            ),
            consumableUpdateData,
          ]
        : [...consumablesValue, consumableUpdateData];
      setValue('consumables', valueSubmit);
    },
    [setValue, watch],
  );

  const onBlur = () => {
    const test: IConsumableUpdateDTO = {
      error: false,
      id: row.original.consumableID ?? 0,
      materialID: row.original.materialID,
      quantity: quantityValue,
    };
    onUpdateQuantity(test);
    table.options.meta?.updateData(row.index, column.id, quantityValue);
  };
  return (
    <MyTextField
      type="number"
      InputProps={{
        value: quantityValue as number,
        onBlur: onBlur,
        disabled,
      }}
      inputProps={{ min: 0 }}
      onChange={(e) => {
        setQuantityValue(parseInt(e.target.value));
      }}
      sx={{ height: '25px' }}
    />
  );
};

/**
 * Bảng hiển thị danh sách các loại VTTH,
 * có thể chỉnh sửa số lượng của từng loại cho request
 */
export const ExaminationConsumablesTable = ({
  request,
  setValue,
  watch,
  disabled,
  modalityType,
}: {
  request?: IOrderRequestDTO;
  setValue: UseFormSetValue<RequestFormFields>;
  watch: UseFormWatch<RequestFormFields>;
  disabled: boolean;
  modalityType: IModalityDTO['name'];
}) => {
  const translate = useTranslate();
  const { isLoading, dataForTable } = useGetDataForUpdateConsumableTable({
    request,
    modalityType,
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
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'quantity',
            header: translate.resources.consumable.quantity(),
            cell: (cellContext) => (
              <QuantityCell
                {...cellContext}
                watch={watch}
                setValue={setValue}
                disabled={disabled}
                request={request}
              />
            ),
            maxSize: 75,
          }),
      },
    ],
    [
      setValue,
      translate.messages,
      translate.resources.consumable,
      watch,
      disabled,
      request,
    ],
  );

  // const consumables = watch('consumables');
  // console.log(consumables);
  // const x = dataForTable.map((item) => item.quantity );
  const consumables =
    !watch('consumables') || watch('consumables')?.length === 0
      ? dataForTable
      : watch('consumables');
  const totalQuantity = consumables
    ?.map((item) => item.quantity ?? 0)
    .reduce((partialSum, a) => partialSum + a, 0);
  return (
    <ExaminationConsumablesTableWrapper>
      <Typography>
        Tổng số vật tư:
        {totalQuantity}
      </Typography>
      <MyTable
        tableRef={tableRef}
        tableId={TABLE_EXAMINATION_CONSUMABLES}
        data={dataForTable}
        tableColumnsDescription={tableColumns}
        MyDataGridProps={{
          isLoading,
        }}
        hiddenFooter={true}
        TanstackTableOptions={{
          enableRowSelection: false,
          enableMultiRowSelection: false,
        }}
      />
    </ExaminationConsumablesTableWrapper>
  );
};

const ExaminationConsumablesTableWrapper = styled('div')`
  max-height: 100px;
`;
