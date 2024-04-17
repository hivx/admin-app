import { Typography } from '@mui/material';

import { ItechSaveBookmarkIcon } from '@/assets/icon';
import ItechScaleIcon from '@/assets/icon/ScaleIcon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { ContextPopupController } from '@/components/Menu/ContextPopupController';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { selectContextMenuMetadata } from '@/stores/contextMenu/contextMenuSlice';
import { IOrderDTO } from '@/types/dto';

import { CompareStudyOrderHistoryMenu } from './CompareStudyOrderHistoryMenu';

export const OrderHistoryRightClickMenu = (props: { menuID?: string }) => {
  const { menuID } = props;
  // const selected = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER));
  const metadata = useAppSelector(selectContextMenuMetadata<IOrderDTO>(menuID));
  const { close } = useContextMenu(menuID);

  const translate = useTranslate();

  return (
    metadata && (
      <ContextPopupController menuID={menuID} type="menu">
        {/**
         * Compare study of order
         */}
        <CompareStudyOrderHistoryMenu metadata={metadata} closeMenu={close} />

        {/* // Compare report result button */}
        <ContextMenuItemShell
          MenuItemProps={{ disabled: true }}
          IconComponent={<ItechScaleIcon fontSize="small" color="disabled" />}
          MainComponent={
            <Typography color="text.disabled">{translate.buttons.compare()}</Typography>
          }
        />
        {/* // Bookmark */}
        <ContextMenuItemShell
          MenuItemProps={{ disabled: true }}
          IconComponent={<ItechSaveBookmarkIcon fontSize="small" color="disabled" />}
          MainComponent={
            <Typography color="text.disabled">
              {translate.buttons.saveBookmark()}
            </Typography>
          }
        />
      </ContextPopupController>
    )
  );
};
