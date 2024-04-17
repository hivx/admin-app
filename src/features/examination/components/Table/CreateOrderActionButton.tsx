import { ItechCrossIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';
import { useCreateOrder } from '@/hooks/order/useCreateOrder';

// type CreateOrderActionButtonProps = {
//   order?: IOrderDTO;
// };
/**
 * Merge study action button
 * Use in examination table action buttons
 */
export const CreateOrderActionButton = () => {
  const translate = useTranslate();
  const { buttonIsActive, iconColor, openCreateOrderModal } = useCreateOrder();

  return (
    <IconButtonWithToolTip
      title={translate.buttons.createOrder()}
      onClick={() => openCreateOrderModal()}
      disabled={!buttonIsActive}
    >
      <TableSVGIcon
        IconComponent={ItechCrossIcon}
        IconComponentProps={{ color: iconColor }}
      />
    </IconButtonWithToolTip>
  );
};
