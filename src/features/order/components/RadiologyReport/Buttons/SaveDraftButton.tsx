import ItechSaveIcon from '@/assets/icon/SaveIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';
import { useSaveDraftReportButton } from '@/hooks/radiology/useSaveDraftReportButton';
import { BUTTON_STATE } from '@/types';

export const SaveDraftButton = () => {
  const translate = useTranslate();
  const { buttonState, onClick } = useSaveDraftReportButton();
  return (
    <IconButtonWithToolTip
      title={translate.pages.orderReport.actions.saveDraft()}
      onClick={onClick}
      color="inherit"
      disabled={buttonState === BUTTON_STATE.DISABLED}
    >
      <TableSVGIcon IconComponent={ItechSaveIcon} />
    </IconButtonWithToolTip>
  );
};
