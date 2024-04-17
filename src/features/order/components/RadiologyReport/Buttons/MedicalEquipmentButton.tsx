import React from 'react';

import ItechMedicalServicesIcon from '@/assets/icon/MedicalServicesIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { useConsumableBeforeApprove } from '@/hooks/radiology/useConsumableBeforeApprove';

import { useCurrentOrderID, useRadiologyReportFunctions } from '../../../providers';
import { ConsumableModal } from '../Modal/ConsumableModal';

export const MedicalEquipmentButton = () => {
  const orderID = useCurrentOrderID();
  const radiologyReportFunc = useRadiologyReportFunctions();
  const { requireConsumable } = useConsumableBeforeApprove({ orderID });
  return (
    <>
      {requireConsumable && (
        <>
          <IconButtonWithToolTip title="Vật tư tiêu hao" color="inherit">
            <ItechMedicalServicesIcon
              onClick={() =>
                radiologyReportFunc.openModalMedicalEquipment &&
                radiologyReportFunc.openModalMedicalEquipment()
              }
            />
          </IconButtonWithToolTip>
          <ConsumableModal />
        </>
      )}
    </>
  );
};
