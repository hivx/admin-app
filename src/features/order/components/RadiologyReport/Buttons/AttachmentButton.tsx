import ItechAttachmentIcon from '@/assets/icon/AttachmentIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { AttachmentModal } from '@/components/Order/AttachmentModal';
import { HOTKEYS } from '@/config';
import { useDisclosure, useKeybinds, useTranslate } from '@/hooks';

import { useCurrentOrderID } from '../../../../order/providers';

export const AttachmentButton = () => {
  const translate = useTranslate();
  const { isOpen, open, close } = useDisclosure(false);
  const orderID = useCurrentOrderID();

  useKeybinds(
    HOTKEYS.ATTACHMENT.key,
    () => {
      open();
    },
    { disabled: !orderID },
  );

  return (
    <>
      <IconButtonWithToolTip
        title={translate.buttons.labelWithKeyBind({
          buttonName: translate.buttons.attachment(),
          key: HOTKEYS.ATTACHMENT.title,
        })}
        onClick={open}
        color="inherit"
      >
        <ItechAttachmentIcon />
      </IconButtonWithToolTip>
      <AttachmentModal closeModal={close} isOpen={isOpen} orderID={orderID} />
    </>
  );
};
