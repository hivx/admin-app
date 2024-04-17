import { ReactNode } from 'react';

import { AddIcon, ItechDeleteIcon, PenIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { TableRefetchButton } from '@/components/Table/TableRefetchButton';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useAppSelector, useTranslate } from '@/hooks';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { ITableID } from '@/stores/table/tableSlice';

type IAdminRightClickMenuProps = {
  refetch?: () => void;
  tableId: ITableID;
  hideButtonDelete?: boolean;
  hideButtonEdit?: boolean;
  hideButtonAdd?: boolean;
  CustomButton?: ReactNode;
  disabled?: boolean;
};

export const AdminTableActionButtons = (props: IAdminRightClickMenuProps) => {
  const {
    refetch,
    tableId,
    hideButtonDelete = false,
    hideButtonEdit = false,
    hideButtonAdd = false,
    CustomButton,
    disabled,
  } = props;
  const adminFunctions = useAdminFunctions();
  const translate = useTranslate();
  const rowSelected = useAppSelector(getCurrentSelectedRow(tableId));
  // const iconColor = rowSelected || disabled ? 'action' : 'disabled';

  return (
    <TableActionButtonsShell
      ActionsButton={
        <>
          {refetch && <TableRefetchButton key="refetch" refetch={refetch} />}
          {CustomButton}
          {/* {
            // disable icon chua implement chuc nang
            <IconButtonWithToolTip
              title={translate.buttons.expand()}
              onClick={() => {}}
              disabled
            >
              <TableSVGIcon
                IconComponent={ItechConfigIcon}
                IconComponentProps={{ color: 'disabled' }}
              />
            </IconButtonWithToolTip>
          } */}

          {!hideButtonAdd && (
            <IconButtonWithToolTip
              title={translate.buttons.create()}
              onClick={() => {
                adminFunctions.openCreateModal();
              }}
              disabled={disabled}
            >
              <TableSVGIcon
                IconComponent={AddIcon}
                IconComponentProps={{ color: 'inherit' }}
              />
            </IconButtonWithToolTip>
          )}
          {!hideButtonEdit && (
            <IconButtonWithToolTip
              title={translate.buttons.modify()}
              onClick={() => {
                adminFunctions.openEditModal();
              }}
              disabled={!rowSelected || disabled}
            >
              <TableSVGIcon
                IconComponent={PenIcon}
                IconComponentProps={{ color: 'inherit' }}
              />
            </IconButtonWithToolTip>
          )}
          {!hideButtonDelete && (
            <IconButtonWithToolTip
              title={translate.buttons.delete()}
              onClick={() => adminFunctions.submitDelete()}
              disabled={!rowSelected || disabled}
            >
              <TableSVGIcon
                IconComponent={ItechDeleteIcon}
                IconComponentProps={{ color: 'inherit' }}
              />
            </IconButtonWithToolTip>
          )}
        </>
      }
    />
  );
};
