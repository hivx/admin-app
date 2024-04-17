import { FC } from 'react';

import { ItechSaveBookmarkIcon } from '@/assets/icon';
import ItechSaveBookmarkedIcon from '@/assets/icon/SaveBookmarkedIcon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useBookmarkButton } from '@/hooks/useBookmarkButton';
import { IOrderDTO } from '@/types/dto';

type BookmarkActionButtonProps = {
  order?: IOrderDTO;
};
export const BookmarkActionButton: FC<BookmarkActionButtonProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  const { handleClick, bookmarks, disabled } = useBookmarkButton(order);
  return (
    <DynamicPanelHeaderButton
      IconComponent={!bookmarks?.length ? ItechSaveBookmarkIcon : ItechSaveBookmarkedIcon}
      title={translate.buttons.labelWithKeyBind({
        buttonName: translate.bookmark.title(),
        key: HOTKEYS.BOOKMARK.title,
      })}
      disabled={disabled}
      onClick={handleClick}
    />
  );
};
