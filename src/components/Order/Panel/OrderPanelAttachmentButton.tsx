import AttachmentIcon from '@/assets/icon/AttachmentIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { AttachmentModal } from '@/components/Order/AttachmentModal';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { HOTKEYS } from '@/config';
import { useDisclosure, useKeybinds, useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

export type OrderPanelAttachmentButtonProps = {
  order?: IOrderDTO;
  isReadOnlyModal: boolean;
};

const OrderPanelAttachmentButton = (props: OrderPanelAttachmentButtonProps) => {
  const { order, isReadOnlyModal } = props;
  const translate = useTranslate();
  const { isOpen, open, close } = useDisclosure(false);
  const colorIconAttachment = order ? 'action' : 'disabled';

  useKeybinds(
    HOTKEYS.ATTACHMENT.key,
    () => {
      open();
    },
    { disabled: !order },
  );

  return (
    <>
      <IconButtonWithToolTip
        title={translate.buttons.labelWithKeyBind({
          buttonName: translate.buttons.attachment(),
          key: HOTKEYS.ATTACHMENT.title,
        })}
        onClick={open}
        disabled={!order}
      >
        <TableSVGIcon
          IconComponent={AttachmentIcon}
          IconComponentProps={{ color: colorIconAttachment }}
        />
      </IconButtonWithToolTip>
      {order && (
        <AttachmentModal
          closeModal={close}
          isOpen={isOpen}
          orderID={order.id}
          isReadOnlyModal={isReadOnlyModal}
        />
      )}
    </>
  );
};

export default OrderPanelAttachmentButton;
