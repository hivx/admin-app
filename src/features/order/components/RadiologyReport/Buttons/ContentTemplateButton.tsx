import { ItechContentTemplateIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { HOTKEYS } from '@/config';
import { useDisclosure, useKeybinds, useTranslate } from '@/hooks';
import { useOrderLockState } from '@/hooks/lockOrder/useOrderLockState';

import { useCurrentOrderID } from '../../../providers';
import { SelectTemplateModal } from '../Modal/SelectTemplateModal';

export const ContentTemplateButton = () => {
  const translate = useTranslate();
  const {
    isOpen: isOpenModalSelect,
    open: openModalSelect,
    close: closeModalSelect,
  } = useDisclosure(false);
  const orderID = useCurrentOrderID();
  const isLock = useOrderLockState({ orderID });
  useKeybinds(HOTKEYS.CONTENT_TEMPLATE.key, () => {
    openModalSelect();
  });

  return (
    <>
      <IconButtonWithToolTip
        title={translate.buttons.labelWithKeyBind({
          buttonName: translate.buttons.contentTemplate(),
          key: HOTKEYS.CONTENT_TEMPLATE.title,
        })}
        onClick={openModalSelect}
        disabled={!isLock}
        color="primary"
      >
        <ItechContentTemplateIcon />
      </IconButtonWithToolTip>
      <SelectTemplateModal closeModal={closeModalSelect} isOpen={isOpenModalSelect} />
    </>
  );
};
