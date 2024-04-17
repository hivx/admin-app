import { useRadiologyReportFunctions } from '@/features/order';
import { useApproveButtonState } from '@/hooks/radiology/useApproveButtonState';

export const useApproveWithTimeButton = () => {
  const radiologyReportFunctions = useRadiologyReportFunctions();

  const { buttonState } = useApproveButtonState('APPROVE_WITH_TIME');

  const handleClick = async () => {
    // show modal approve with time
    radiologyReportFunctions.openModalSelectApproveTime?.();
  };

  return {
    buttonState,
    onClick: handleClick,
    onListItemClick: handleClick,
  };
};
