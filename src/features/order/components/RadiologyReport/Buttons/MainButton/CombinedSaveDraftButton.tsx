import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography } from '@mui/material';
import { useRef } from 'react';

import { MyButton } from '@/components';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { ActionComponentWithMenu } from '@/components/Table/ActionComponentWithMenu';
import { useTranslate } from '@/hooks';
import { useSaveDraftReportButton } from '@/hooks/radiology/useSaveDraftReportButton';
import { BUTTON_STATE } from '@/types';

import { useDeleteLockOrderAndCloseButton } from '../../../../../../hooks/lockOrder/useDeleteLockOrderAndCloseButton';
import {
  ICombinedApproveReportButton,
  useCombinedApproveReportButtons,
} from '../../../../hooks/useCombinedApproveReportButtons';

import { MainButton } from './MainButton';

/**
 * Approve button with drop down menu
 */
export const CombinedSaveDraftButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const saveDraftHandler = useSaveDraftReportButton();

  const {
    buttonState: deleteLockAndCloseButtonState,
    onClick: onDeleteAndCloseButtonClick,
  } = useDeleteLockOrderAndCloseButton();
  const translate = useTranslate();

  const buttons: ICombinedApproveReportButton[] = [
    {
      label: translate.buttons.save(),
      ...saveDraftHandler,
    },
    {
      label: translate.buttons.close(),
      buttonState: deleteLockAndCloseButtonState,
      onClick: onDeleteAndCloseButtonClick,
      onListItemClick: onDeleteAndCloseButtonClick,
    },
  ];

  const { mainButton, filteredButtons } = useCombinedApproveReportButtons(buttons);

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
