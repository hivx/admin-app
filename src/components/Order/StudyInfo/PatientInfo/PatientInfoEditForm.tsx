import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { useRegisterEditOrderFunctions } from '@/providers/Order/EditOrderFunctionsProvider';
import { Gender, IOrderDTO, IPatientDTOUpdate, ORDER_CREATION_TYPE } from '@/types/dto';

import { useUpdatePatientInfoMutation } from '../../../../features/order/api';

import { PatientInfoEditFields } from './PatientInfoEditFields';
import { PatientInfoFormFieldsType } from './PatientInfoFields';

type PatientInfoEditFormProps = {
  onSuccessCallback: () => void;
  order: IOrderDTO;
  disabled: boolean;
};

export const PatientInfoEditForm: FC<PatientInfoEditFormProps> = (props) => {
  const { order, onSuccessCallback, disabled } = props;
  const translate = useTranslate();
  const [updatePatientInfo] = useUpdatePatientInfoMutation();
  const register = useRegisterEditOrderFunctions();
  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.patient.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.patient.title().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: PatientInfoFormFieldsType) => {
    if (formData.id) {
      const submitForm: IPatientDTOUpdate = {
        address: formData.address ?? '',
        creationType: formData.creationType ?? ORDER_CREATION_TYPE.RIS,
        fullname: formData.fullname ?? '',
        email: formData.email ?? '',
        gender: formData.gender ?? Gender.O,
        phone: formData.phone ?? '',
        pid: formData.pid ?? '',
        birthDate: formData.birthDate ?? '',
        id: formData.id,
      };
      try {
        const res = await updatePatientInfo(submitForm);
        if ('error' in res) {
          notifyError();
        } else {
          notifySuccess();
          onSuccessCallback();
        }
      } catch (e) {
        notifyError();
      }
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
        email: z.string().optional(),
        address: z.string().optional(),
        gender: z.string().optional(),
        phone: z.string().optional(),
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
      address: order.patient?.address ?? '',
      birthDate: order.patient?.birthDate ?? '',
      email: order.patient?.email ?? '',
      fullname: order.patient?.fullname ?? '',
      gender: order.patient?.gender ?? Gender.O,
      phone: order.patient?.phone ?? '',
      pid: order.patient?.pid ?? '',
      id: order.patient?.id || 0,
    },
  };

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('editPatientInfo', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => (
        <PatientInfoEditFields
          controls={controls}
          disabled={disabled}
          onSuccessCallback={onSuccessCallback}
        />
      )}
    />
  );
};
