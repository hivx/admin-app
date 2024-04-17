import { Switch, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import React, { FC, useMemo, useState } from 'react';

import { MyTextField } from '@/components/Elements';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import {
  SettingOrderTableType,
  useUserSettingOrderTable,
} from '@/hooks/UserConfig/useUserSettingOrderTable';
import { TABLE_CONFIG_ORDER_LIST } from '@/stores/table/tableInitialState';
import { OrderTableColumnKey } from '@/types/dto/setting';

const EditWidthCell: FC<
  CellContext<SettingOrderTableType, unknown> & {
    onChangeColumnWidth: ({
      orderTableSettingKey,
      width,
    }: {
      orderTableSettingKey: `${OrderTableColumnKey}`;
      width: number;
    }) => void;
  }
> = ({ cell, column, row, onChangeColumnWidth }) => {
  const [value, setValue] = useState(cell.row.original.width);

  // const [value, setValue] = useState(initialValue);
  const onBlur = () => {
    onChangeColumnWidth({
      orderTableSettingKey: cell.row.original.id,
      width: value,
    });
  };
  return (
    <StyledDivCenterChildren>
      <MyTextField
        size="extrasmall"
        type="number"
        InputProps={{
          value: value,
          onBlur: onBlur,
          // disabled,
        }}
        onChange={(e) => {
          if (e.target.value !== null) {
            setValue(parseInt(e.target.value));
          }
        }}
        sx={{ height: '25px', width: '80px' }}
      />
    </StyledDivCenterChildren>
  );
};

export const SettingOrderTableContent = () => {
  const translate = useTranslate();

  const { onChangeColumnVisible, orderTableSettingState, onChangeColumnWidth } =
    useUserSettingOrderTable();
  const tableData: SettingOrderTableType[] = useMemo(
    () =>
      orderTableSettingState
        ? Object.entries(orderTableSettingState).map(([columnID, value]) => {
            return {
              id: columnID as OrderTableColumnKey,
              visible: value.visible,
              width: value.width,
            };
          })
        : [],
    [orderTableSettingState],
  );

  const tableColumns = useMemo<ITableField<SettingOrderTableType>[]>(
    () => [
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'id',
            header: 'Trường / Cột',
            cell: (props) => (
              <Typography>
                {translate.resources.setting.orderFieldName({
                  key: props.row.original.id,
                })}
              </Typography>
            ),
            size: 200,
          }),
      },
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
            id: 'width',
            header: 'Độ rộng',
            cell: (props) => (
              <StyledDivCenterChildren>
                <EditWidthCell {...props} onChangeColumnWidth={onChangeColumnWidth} />
              </StyledDivCenterChildren>
            ),
            size: 150,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'visible',
            header: 'Trạng thái',
            cell: (props) => (
              <StyledDivCenterChildren>
                <Switch
                  checked={props.row.original.visible}
                  size="small"
                  onChange={(e) =>
                    onChangeColumnVisible({ orderTableSettingKey: props.row.original.id })
                  }
                />
              </StyledDivCenterChildren>
            ),
            size: 150,
          }),
      },
    ],
    [onChangeColumnVisible, onChangeColumnWidth, translate.messages],
  );

  return (
    <div>
      <MyTable
        tableId={TABLE_CONFIG_ORDER_LIST}
        data={tableData}
        tableColumnsDescription={tableColumns}
        TanstackTableOptions={{
          enableRowSelection: false,
          enableMultiRowSelection: false,
        }}
        hiddenFooter
      />
    </div>
  );
};
