import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useCreateConfigMutation } from '@/api/config';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IConfigCreateDTO, IConfigForm } from '@/types/dto';

import { ConfigFormFields } from './ConfigFormFields';

/**
 * Form to create PACS config
 */
export const ConfigCreateForm = ({
  onSuccessCallback,
}: {
  onSuccessCallback: () => void;
}) => {
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();
  const [createConfig] = useCreateConfigMutation();
  const formOptions: UseFormProps<IConfigForm> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        attributeID: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.config.attribute(),
            }),
          ),
        attributeValue: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.config.attributeValue(),
            }),
          ),
        preferred: z.boolean().optional(),
      }),
    ),
    defaultValues: {
      attributeID: '',
      attributeValue: '',
      preferred: undefined,
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.config.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.config.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IConfigForm) => {
    const { attributeID, attributeValue, preferred } = formData;
    try {
      const submitForm: IConfigCreateDTO = {
        attributeID: attributeID ?? '',
        attributeValue: attributeValue ?? '',
        preferred: preferred ?? false,
      };
      const res = await createConfig(submitForm);
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
        register('submitCreateForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => <ConfigFormFields {...controls} />}
    />
  );
};
