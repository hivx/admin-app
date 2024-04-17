import { useTranslate } from '@/hooks';
import { useLockOrderButton } from '@/hooks/lockOrder/useLockOrderButton';
import { BUTTON_STATE } from '@/types';

import { StyledMobileRadiologyButton } from './RadiologyButton.styles';
/**
 * Nút Nhận ca
 * Màn viết KQ
 */
export const MobileLockOrderButton = () => {
  const translate = useTranslate();
  const { buttonState, onClick } = useLockOrderButton();
  return (
    <StyledMobileRadiologyButton
      variant="contained"
      disabled={buttonState === BUTTON_STATE.DISABLED}
      onClick={onClick}
    >
      {translate.pages.orderReport.actions.lock()}
    </StyledMobileRadiologyButton>
  );
};
