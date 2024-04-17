import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateModalityTypeNameMutation } from '@/api/modalityTypeName';
import { MIN_LENGTH_CONTENT_NAME } from '@/components/Admin/Content/ContentCreateForm';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IModalityTypeNameDTO, IModalityTypeNameDTOUpdate } from '@/types/dto';

import { ModalityTypeNameFormFields } from './ModalityTypeNameFormFields';

export type ModalityTypeNameEditFormProps = {
  onSuccessCallback?: () => void;
  record: IModalityTypeNameDTO;
};
export const ModalityTypeNameEditForm = (props: ModalityTypeNameEditFormProps) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const translate = useTranslate();
  const [editModalityTypeName] = useUpdateModalityTypeNameMutation();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.modalityTypeName.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.modalityTypeName.title().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<ModalityTypeNameFormFields> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        id: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.modalityTypeName.id(),
            }),
          ),
        name: z
          .string()
          .trim()
          .min(
            MIN_LENGTH_CONTENT_NAME,
            translate.messages.validation.genericMinLength({
              resource: translate.resources.modalityTypeName.name(),
              length: MIN_LENGTH_CONTENT_NAME,
            }),
          ),
        description: z.string().optional().nullable(),
      }),
    ),
    defaultValues: {
      id: record.id,
      name: record.name,
      description: record.description,
    },
  };

  const handleSubmit = async (formData: ModalityTypeNameFormFields) => {
    try {
      const submitForm: IModalityTypeNameDTOUpdate = {
        id: formData.id ?? '',
        name: formData.name ?? '',
        description: formData.description ?? '',
      };
      const res = await editModalityTypeName(submitForm);
      if ('error' in res) {
        notifyError();
      } else {
        notifySuccess();
        onSuccessCallback && onSuccessCallback();
      }
    } catch (e) {
      notifyError();
    }
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitEditForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => (
        <ModalityTypeNameFormFields record={record} {...controls} />
      )}
    />
  );
};
