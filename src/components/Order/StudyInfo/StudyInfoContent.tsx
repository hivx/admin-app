import React, { FC } from 'react';

import { useUpdateOrderMutation } from '@/api/order';
import { useTranslate } from '@/hooks';
import { useRegisterEditOrderFunctions } from '@/providers/Order/EditOrderFunctionsProvider';
import { BaseEntity } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { OrderInfoEditForm } from './OrderInfoEditForm';
import { PatientInfoEditForm } from './PatientInfo/PatientInfoEditForm';
import { StudyInfoContentShell } from './StudyInfoContentShell';

type StudyInfoContentProps = {
  /**
   * Patient Info
   * Status disable input. If 'false' => input can edit
   */
  isEditPatientInfo: boolean;
  /**
   * Patient Info
   * Change status disable
   * @returns boolean
   */
  isEditPatientInfoToggle: () => void;
  /**
   * Order Info
   * Status disable input. If 'false' => input can edit
   */
  isEditOrderInfo: boolean;
  /**
   * Order Info
   * Change status disable
   * @returns boolean
   */
  isEditOrderInfoToggle: () => void;
  order: IOrderDTO;
};
const StudyInfoContent: FC<StudyInfoContentProps> = (props) => {
  const {
    order,
    isEditPatientInfo,
    isEditPatientInfoToggle,
    isEditOrderInfo,
    isEditOrderInfoToggle,
  } = props;
  const translate = useTranslate();
  const register = useRegisterEditOrderFunctions();
  const [updateOrder] = useUpdateOrderMutation();
  const changePatientForOrder = (patientID: BaseEntity['id']) => {
    updateOrder({ id: order.id, patientID });
  };
  register('changeOrderPatient', changePatientForOrder);
  return (
    <StudyInfoContentShell
      PatientInfoHeader={translate.resources.order.patient.title()}
      OrderInfoHeader={translate.resources.order.title.assignInfo()}
      PatientInfoContent={
        <PatientInfoEditForm
          order={order}
          onSuccessCallback={isEditPatientInfoToggle}
          disabled={!isEditPatientInfo}
        />
      }
      OrderInfoContent={
        <OrderInfoEditForm
          disabled={!isEditOrderInfo}
          order={order}
          onSuccessCallback={isEditOrderInfoToggle}
        />
      }
    />
  );
};

export default StudyInfoContent;
