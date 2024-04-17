import React, { FC } from 'react';

import { ItechMergeStudyIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useKeybinds, useTranslate } from '@/hooks';
import { useMergeStudyButton } from '@/hooks/order/useMergeStudyButton';
import { IOrderDTO } from '@/types/dto';

type MergeStudyMenuItemProps = {
  order: IOrderDTO;
  closeMenu: () => void;
};
const MergeStudyMenuItem: FC<MergeStudyMenuItemProps> = (props) => {
  const { order, closeMenu } = props;
  const translate = useTranslate();
  const { buttonIsActive, iconColor, openMergeStudyModal } = useMergeStudyButton(order);

  /**
   * Open modal
   */
  const handleOnClick = () => {
    closeMenu();
    openMergeStudyModal();
  };

  useKeybinds(HOTKEYS.MERGE_STUDY.key, () => handleOnClick(), {
    disabled: !buttonIsActive,
  });

  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: !buttonIsActive,
        onClick: handleOnClick,
      }}
      IconComponent={<ItechMergeStudyIcon fontSize="small" color={iconColor} />}
      MainComponent={translate.resources.study.mergeStudyInfo()}
      hotkeyString={HOTKEYS.MERGE_STUDY.title}
    />
  );
};

export default MergeStudyMenuItem;
