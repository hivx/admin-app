import { useTranslate } from '@/hooks';
import { useSaveDraftReportButton } from '@/hooks/radiology/useSaveDraftReportButton';
import { BUTTON_STATE } from '@/types';

import {
  MobileRadiologyButtonProps,
  StyledMobileRadiologyButton,
} from './RadiologyButton.styles';

/**
 * Nút Lưu nháp
 * Màn viết KQ
 */
export const MobileSaveDraftButton = ({ order }: MobileRadiologyButtonProps) => {
  const translate = useTranslate();
  const { onClick: onSaveDraft, buttonState: saveDraftButtonState } =
    useSaveDraftReportButton();
  return (
    <StyledMobileRadiologyButton
      variant="contained"
      onClick={onSaveDraft}
      disabled={saveDraftButtonState === BUTTON_STATE.DISABLED}
    >
      {translate.pages.orderReport.actions.saveDraft()}
    </StyledMobileRadiologyButton>
  );
};
