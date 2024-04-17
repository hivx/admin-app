import { MenuItem } from '@mui/material';
import { FC, forwardRef, RefObject } from 'react';

import { IMyMenuProps, MyMenu } from '@/components/Menu/MyMenu';
import { useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { selectCurrentRequestID, setContentTemplateID } from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IContentDTO } from '@/types/dto';

type ContentTemplateSubMenuProps = {
  /**
   * Optional element for the menu to catch onto
   */
  anchorRef?: RefObject<HTMLElement>;
  /**
   * Menu props
   */
  MyMenuProps?: Partial<IMyMenuProps>;
  isOpen: boolean;
  close: () => void;
  closeAllMenu: () => void;
  anchorEl?: null | HTMLElement;
  contentList: IContentDTO[];
};

export const ContentTemplateSubMenu: FC<ContentTemplateSubMenuProps> = forwardRef<
  HTMLDivElement,
  ContentTemplateSubMenuProps
>((props) => {
  const { MyMenuProps, isOpen, close, closeAllMenu, anchorEl, contentList } = props;
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));

  const handleContentItemClick = (contentID: BaseEntity['id']) => async () => {
    dispatch(
      setContentTemplateID({
        orderID,
        requestID,
        contentID,
        triggerSetContentData: true,
      }),
    );
    closeAllMenu();
  };

  return (
    <MyMenu
      // Set pointer events to 'none' to prevent the invisible Popover div
      // from capturing events for clicks and hovers
      style={{ pointerEvents: 'none' }}
      anchorEl={anchorEl}
      open={isOpen}
      onClose={closeAllMenu}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      MenuListProps={{
        onMouseLeave: () => {
          close();
        },
      }}
      {...MyMenuProps}
    >
      {contentList &&
        (contentList?.length > 0 ? (
          contentList.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id ?? ''}
              title={item.name ?? ''}
              onClick={handleContentItemClick(item.id)}
              style={{ pointerEvents: 'auto' }}
            >
              {item.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem key="" value="" style={{ pointerEvents: 'auto' }}>
            {translate.messages.result.noData()}
          </MenuItem>
        ))}
    </MyMenu>
  );
});

ContentTemplateSubMenu.displayName = 'ContentTemplateSubMenu';
