import ItechDeleteLockIcon from '@/assets/icon/DeleteLockIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { HOTKEYS } from '@/config';
import { useAppSelector, useKeybinds, useTranslate } from '@/hooks';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

import { useDeleteLockOrder } from '../../../../../hooks/lockOrder/useDeleteLockOrder';

export const DeleteLockOrderButton = () => {
  const translate = useTranslate();
  const order = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER));
  const { deletable, deleteLockOrder } = useDeleteLockOrder(order?.id);
  const iconColor = !deletable ? 'disabled' : 'action';

  useKeybinds(
    HOTKEYS.DELETE_LOCK_ORDER.key,
    () => {
      deleteLockOrder();
    },
    { disabled: !deletable },
  );

  return (
    <IconButtonWithToolTip
      title={translate.buttons.labelWithKeyBind({
        buttonName: translate.pages.orderReport.actions.deleteLock(),
        key: HOTKEYS.DELETE_LOCK_ORDER.title,
      })}
      disabled={!deletable}
      onClick={() => deleteLockOrder()}
    >
      <TableSVGIcon
        IconComponent={ItechDeleteLockIcon}
        IconComponentProps={{ color: iconColor }}
      />
    </IconButtonWithToolTip>
  );
};
