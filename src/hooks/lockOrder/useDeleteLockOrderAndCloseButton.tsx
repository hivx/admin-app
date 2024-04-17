import { useCallback } from 'react';

import { BUTTON_STATE } from '@/types';

import { useRadiologyReportFunctions } from '../../features/order/providers';

import { useDeleteLockOrderButton } from './useDeleteLockOrderButton';

/**
 * Delete lock and close
 */
export const useDeleteLockOrderAndCloseButton = () => {
  const { buttonState, onClick } = useDeleteLockOrderButton();
  const radiologyReportFunctions = useRadiologyReportFunctions();

  const handleClick = useCallback(async () => {
    await onClick();
    radiologyReportFunctions.close();
  }, [onClick, radiologyReportFunctions]);
  return {
    buttonState: buttonState || BUTTON_STATE.DISABLED,
    onClick: handleClick,
  };
};
