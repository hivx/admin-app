import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import React, { FC, useMemo } from 'react';

import { MyTextField } from '@/components/Elements';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { useUserShortcutKey } from '@/hooks/UserConfig/useUserShortcutKey';
import { TABLE_SHORTCUTKEY } from '@/stores/table/tableInitialState';
import { TableShortcutKeyType } from '@/types/dto';
import { ShortcutSettingKey } from '@/types/dto/setting';

const EditShortcutCell: FC<
  CellContext<TableShortcutKeyType, unknown> & {
    onChangeKey: ({
      shortcutSettingKey,
      keyValue,
    }: {
      shortcutSettingKey: `${ShortcutSettingKey}`;
      keyValue: string;
    }) => void;
  }
> = ({ cell, column, row, onChangeKey }) => {
  const initialValue = cell.row.original.key;

  // const [value, setValue] = useState(initialValue);

  return (
    <StyledDivCenterChildren>
      <Typography>ALT + </Typography>
      <MyTextField
        size="extrasmall"
        type="text"
        InputProps={{
          value: initialValue,
          // onBlur: onBlur,
          // disabled,
        }}
        onChange={(e) => {
          if (e.target.value !== null) {
            onChangeKey({
              shortcutSettingKey: cell.row.original.id as `${ShortcutSettingKey}`,
              keyValue: e.target.value.slice(0, 1).toLocaleUpperCase(),
            });
          }
        }}
        sx={{ height: '25px', width: '60px' }}
      />
    </StyledDivCenterChildren>
  );
};

export const UserConfigShortcut = () => {
  const translate = useTranslate();
  const { shortcutSettingState, onChangeOneShortcutKeySetting } = useUserShortcutKey();

  const tableData: TableShortcutKeyType[] = useMemo(
    () =>
      shortcutSettingState
        ? Object.entries(shortcutSettingState).map(([keyID, shortcutKey]) => {
            return { id: keyID, key: shortcutKey };
          })
        : [],
    [shortcutSettingState],
  );

  const tableColumns = useMemo<ITableField<TableShortcutKeyType>[]>(
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
            id: 'modalityName',
            header: 'Chức năng',
            cell: (props) => (
              <Typography>
                {translate.resources.setting.shortcutKeyDescription({
                  key: props.row.original.id as `${ShortcutSettingKey}`,
                })}
              </Typography>
            ),
            size: 300,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'modalityType',
            header: 'Phím tắt',
            cell: (props) => (
              <EditShortcutCell {...props} onChangeKey={onChangeOneShortcutKeySetting} />
            ),
            size: 150,
          }),
      },
    ],
    [onChangeOneShortcutKeySetting, translate.messages, translate.resources.setting],
  );

  return (
    <div>
      <MyTable
        tableId={TABLE_SHORTCUTKEY}
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
