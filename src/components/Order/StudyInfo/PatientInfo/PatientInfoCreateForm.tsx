import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import {
  useCreateOrderContext,
  useRegisterCreateOrderFunctions,
} from '@/providers/Order/CreateOrderFunctionsProvider';
import { BaseEntity } from '@/types';
import { IPatientDTOCreate, ORDER_CREATION_TYPE, Gender } from '@/types/dto';

import { useCreateOnePatientMutation } from '../../../../features/order/api';

import { PatientInfoCreateFields } from './PatientInfoCreateFields';
import { PatientInfoFormFieldsType } from './PatientInfoFields';

type PatientInfoCreateFormProps = {
  onSuccessCallback?: (patientID?: BaseEntity['id']) => void;
};

export const patientInfoCreateDefaultValue: Partial<IPatientDTOCreate> = {
  address: '',
  birthDate: '',
  email: '',
  fullname: '',
  gender: Gender.O,
  phone: '',
};

export const PatientInfoCreateForm: FC<PatientInfoCreateFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const translate = useTranslate();
  const [createPatientInfo] = useCreateOnePatientMutation();
  const register = useRegisterCreateOrderFunctions();
  const { currentPatient } = useCreateOrderContext();

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.patient.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: PatientInfoFormFieldsType) => {
    const submitForm: IPatientDTOCreate = {
      address: formData.address ?? '',
      creationType: formData.creationType ?? ORDER_CREATION_TYPE.RIS,
      fullname: formData.fullname ?? '',
      email: formData.email ?? '',
      gender: formData.gender ?? Gender.O,
      phone: formData.phone ?? '',
      pid: formData.pid ?? '',
      birthDate: formData.birthDate ?? '',
    };

    if (currentPatient) {
      onSuccessCallback && onSuccessCallback(currentPatient.id);
      return;
    }

    try {
      const res = await createPatientInfo(submitForm);
      if ('error' in res) {
        notifyError();
      } else {
        onSuccessCallback && onSuccessCallback(res.data);
      }
    } catch (e) {
      notifyError();
    }
  };

  const formOptions: UseFormProps<PatientInfoFormFieldsType> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        fullname: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.patient.fullName(),
            }),
          ),
        birthDate: z.string().optional(),
        email: z.string().optional().nullable(),
        address: z.string().optional().nullable(),
        gender: z.string().optional(),
        phone: z.string().optional().nullable(),
        pid: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.patient.id(),
            }),
          ),
        id: z.number().optional(),
      }),
    ),
    defaultValues: {
      address: patientInfoCreateDefaultValue.address,
      birthDate: patientInfoCreateDefaultValue.birthDate,
      email: patientInfoCreateDefaultValue.email,
      fullname: patientInfoCreateDefaultValue.fullname,
      gender: patientInfoCreateDefaultValue.gender,
      phone: patientInfoCreateDefaultValue.phone,
      pid: '',
      id: undefined,
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('createPatientInfo', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => (
        <PatientInfoCreateFields
          controls={controls}
          onSuccessCallback={onSuccessCallback}
        />
      )}
    />
  );
};
