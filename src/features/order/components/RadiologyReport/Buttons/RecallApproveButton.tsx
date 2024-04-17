import { ItechUnlockOrderAndCloseIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useCancelApproveButton } from '@/hooks/radiology/useCancelApproveButton';
import { BUTTON_STATE } from '@/types';

export const RecallApproveButton = () => {
  const { buttonState, label, onClick } = useCancelApproveButton();
  return (
    <IconButtonWithToolTip
      title={label}
      onClick={onClick}
      color="inherit"
      disabled={buttonState === BUTTON_STATE.DISABLED}
    >
      <TableSVGIcon IconComponent={ItechUnlockOrderAndCloseIcon} />
    </IconButtonWithToolTip>
  );
};
