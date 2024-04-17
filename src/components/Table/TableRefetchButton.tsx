import { FC } from 'react';

import { RefreshIcon } from '@/assets/icon';
import { HOTKEYS } from '@/config';
import { useKeybinds, useTranslate } from '@/hooks';

import { IconButtonWithToolTip } from '../Elements/Buttons/IconButtonWithToolTip';

import { TableSVGIcon } from './TableSVGIcon';

type TableRefetchButtonProps = {
  refetch: () => void;
  /**
   * refresh label + hotkey
   */
  enableKeybind?: boolean;
};
export const TableRefetchButton: FC<TableRefetchButtonProps> = (props) => {
  const { refetch, enableKeybind = false } = props;
  const translate = useTranslate();

  useKeybinds(enableKeybind ? HOTKEYS.REFRESH.key : undefined, () => {
    refetch && refetch();
  });

  return (
    <IconButtonWithToolTip
      title={
        enableKeybind
          ? translate.buttons.labelWithKeyBind({
              buttonName: translate.buttons.refresh(),
              key: HOTKEYS.REFRESH.title,
            })
          : translate.buttons.refresh()
      }
      onClick={refetch}
    >
      <TableSVGIcon
        IconComponent={RefreshIcon}
        IconComponentProps={{ color: 'action' }}
      />
    </IconButtonWithToolTip>
  );
};
