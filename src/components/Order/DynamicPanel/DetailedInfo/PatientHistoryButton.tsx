import React from 'react';
import { Link } from 'react-router-dom';

import ItechConsumablesIcon from '@/assets/icon/ConsumablesIcon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { ROUTE_MEDICAL_HISTORY } from '@/features/order';
import { useTranslate } from '@/hooks';
import { IPatientDTO } from '@/types/dto';

export const PatientHistoryButton = ({ patient }: { patient: IPatientDTO | null }) => {
  const translate = useTranslate();
  const disabled = !patient;
  return (
    <Link to={`${ROUTE_MEDICAL_HISTORY}/${patient?.id}`} target={`_blank_${patient?.id}`}>
      <DynamicPanelHeaderButton
        IconComponent={ItechConsumablesIcon}
        title={translate.resources.order.patientHistory.title()}
        disabled={disabled}
      />
    </Link>
  );
};
