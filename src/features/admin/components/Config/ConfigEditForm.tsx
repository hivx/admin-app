import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateConfigMutation } from '@/api/config';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IConfigDTO, IConfigForm, IConfigUpdateDTO } from '@/types/dto';

import { ConfigFormFields } from './ConfigFormFields';

/**
 * Form to edit PACS config
 */
export const ConfigEditForm = ({
  onSuccessCallback,
  record,
}: {
  onSuccessCallback: () => void;
  record: IConfigDTO;
}) => {
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();
  const [updateConfig] = useUpdateConfigMutation();
  const formOptions: UseFormProps<IConfigForm> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        attributeID: z.string(),
        attributeValue: z.string().optional(),
        preferred: z.boolean().optional(),
      }),
    ),
    defaultValues: {
      attributeID: record.attribute?.id ?? '',
      attributeValue: record.attributeValue ?? '',
      preferred: record.preferred ?? false,
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.config.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.config.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IConfigForm) => {
    const { attributeValue, preferred } = formData;
    try {
      const submitForm: IConfigUpdateDTO = {
        id: record.id,
        attributeValue: attributeValue ?? '',
        preferred,
      };
      const res = await updateConfig(submitForm);
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
      renderInputs={(controls) => <ConfigFormFields record={record} {...controls} />}
    />
  );
};
