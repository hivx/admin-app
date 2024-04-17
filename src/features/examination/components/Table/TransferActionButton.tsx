import ItechTransferIcon from '@/assets/icon/TransferIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TransferStudyModal } from '@/components/Order/TransferStudy/TransferStudyModal';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { HOTKEYS } from '@/config';
import { useDisclosure, useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

export const TransferActionButton = ({ order }: { order?: IOrderDTO }) => {
  const translate = useTranslate();
  const disclosure = useDisclosure();
  return (
    <>
      <IconButtonWithToolTip
        title={translate.buttons.labelWithKeyBind({
          buttonName: translate.buttons.transfer(),
          key: HOTKEYS.TRANSFER.title,
        })}
        onClick={disclosure.open}
        disabled={!order?.study}
      >
        <TableSVGIcon IconComponent={ItechTransferIcon} />
      </IconButtonWithToolTip>
      {disclosure.isOpen && order?.id && (
        <TransferStudyModal disclosure={disclosure} orderID={order.id} />
      )}
    </>
  );
};
