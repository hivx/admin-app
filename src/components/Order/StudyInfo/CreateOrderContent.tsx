import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { BaseEntity } from '@/types';

import { OrderInfoCreateForm } from './OrderInfoCreateForm';
import { PatientInfoCreateForm } from './PatientInfo/PatientInfoCreateForm';
import { StudyInfoContentShell } from './StudyInfoContentShell';

type CreateOrderContentProps = {
  onCreatePatientInfoCallback?: (patientID?: BaseEntity['id']) => void;
  onCreateOrderInfoCallback?: () => void;
};
const CreateOrderContent: FC<CreateOrderContentProps> = (props) => {
  const { onCreatePatientInfoCallback, onCreateOrderInfoCallback } = props;
  const translate = useTranslate();
  return (
    <StudyInfoContentShell
      PatientInfoHeader={translate.resources.order.patient.title()}
      OrderInfoHeader={translate.resources.order.title.assignInfo()}
      PatientInfoContent={
        <PatientInfoCreateForm onSuccessCallback={onCreatePatientInfoCallback} />
      }
      OrderInfoContent={
        <OrderInfoCreateForm onSuccessCallback={onCreateOrderInfoCallback} />
      }
    />
  );
};

export default CreateOrderContent;
