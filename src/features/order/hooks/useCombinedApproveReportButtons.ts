import { ReactNode } from 'react';

import { BUTTON_STATE } from '@/types';
import { IRadiologyReportButtonHandler } from '@/types/order/buttons';

export type ICombinedApproveReportButton = {
  icon?: ReactNode;
  label: string;
  hotkey?: string;
} & IRadiologyReportButtonHandler;

export const useCombinedApproveReportButtons = (
  buttons: ICombinedApproveReportButton[],
) => {
  const filteredButtons = buttons.filter(
    (button) => button.buttonState !== BUTTON_STATE.HIDDEN,
  );

  const mainButton = filteredButtons.splice(0, 1)[0];
  return {
    mainButton,
    filteredButtons,
  };
};
