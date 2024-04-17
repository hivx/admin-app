import { useTranslate } from '@/hooks';
import { useRadiologyApproveReportButton } from '@/hooks/radiology/useRadiologyApproveReportButton';
import { BUTTON_STATE } from '@/types';

import {
  MobileRadiologyButtonProps,
  StyledMobileRadiologyButton,
} from './RadiologyButton.styles';

/**
 * Nút duyệt
 * Màn viết KQ
 */
export const MobileApproveButton = ({ order }: MobileRadiologyButtonProps) => {
  const translate = useTranslate();
  const { onClick: onApprove, buttonState: approveButtonState } =
    useRadiologyApproveReportButton();
  return (
    <StyledMobileRadiologyButton
      variant="contained"
      onClick={onApprove}
      disabled={approveButtonState === BUTTON_STATE.DISABLED}
    >
      {translate.pages.orderReport.actions.approve()}
    </StyledMobileRadiologyButton>
  );
};
