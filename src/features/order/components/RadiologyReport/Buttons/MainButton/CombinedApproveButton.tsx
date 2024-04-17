import { Typography } from '@mui/material';
import { useRef } from 'react';

import { useRadiologyApproveReportButton } from '@/hooks/radiology/useRadiologyApproveReportButton';
import { BUTTON_STATE } from '@/types';

import {
  ICombinedApproveReportButton,
  useCombinedApproveReportButtons,
} from '../../../../hooks/useCombinedApproveReportButtons';

import { MainButton } from './MainButton';

/**
 * Approve button with drop down menu
 */
export const CombinedApproveButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { onClickCombineButtonApprove, onClick, ...approveReportButtonState } =
    useRadiologyApproveReportButton();

  const buttons: ICombinedApproveReportButton[] = [
    {
      label: approveReportButtonState.buttonLabel,
      onClick: onClickCombineButtonApprove,
      ...approveReportButtonState,
    },
  ];

  const { mainButton } = useCombinedApproveReportButtons(buttons);

  return (
    <>
      <MainButton
        ref={buttonRef}
        disabled={mainButton.buttonState === BUTTON_STATE.DISABLED}
        onClick={mainButton.onClick}
      >
        <Typography textTransform="uppercase">{mainButton.label}</Typography>
      </MainButton>
    </>
  );
};
