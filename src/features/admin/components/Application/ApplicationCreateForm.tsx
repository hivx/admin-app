import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useCreateApplicationMutation } from '@/api/application';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IApplicationCreateDTO } from '@/types/dto/application';
import { isJsonObject } from '@/utils/validateJSON';

import { ApplicationFormFields, IApplicationFormFields } from './ApplicationFormFields';

type ApplicationCreateFormProps = {
  onSuccessCallback: () => void;
};

export const ApplicationCreateForm: FC<ApplicationCreateFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const translate = useTranslate();
  const [createCertificate] = useCreateApplicationMutation();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.application.title.short().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.application.title.short().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IApplicationFormFields) => {
    try {
      // final validation
      const submitForm: IApplicationCreateDTO = {
        config: formData.config ?? '',
        name: formData.name ?? '',
        enabled: formData.enabled ?? false,
        secret: formData.secret ?? '',
        type: formData.type ?? '',
        url: formData.url ?? '',
      };
      const res = await createCertificate(submitForm);
      if ('error' in res) {
        notifyError();
      } else {
        notifySuccess();
        onSuccessCallback();
      }
    } catch (e) {
      notifyError();
    }
  };

  const formOptions: UseFormProps<IApplicationFormFields> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        type: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.application.type(),
            }),
          ),
        name: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.application.name(),
            }),
          ),
        url: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.application.url(),
            }),
          ),
        secret: z.string().optional(),
        config: z
          .string()
          .refine(
            (value) => {
              if (value.length) return isJsonObject(value);
              return true;
            },
            translate.messages.validation.genericRequiredType({
              resource: translate.resources.application.config(),
              type: 'jsonObject',
            }),
          )
          .optional(),
        enabled: z.boolean().optional(),
      }),
    ),
    defaultValues: {
      config: '',
      name: '',
      enabled: false,
      secret: '',
      type: '',
      url: '',
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitCreateForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => (
        <ApplicationFormFields onSuccessCallback={onSuccessCallback} {...controls} />
      )}
    />
  );
};
