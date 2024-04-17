import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateApplicationMutation } from '@/api/application';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IApplicationDTO } from '@/types/dto/application';
import { isJsonObject } from '@/utils/validateJSON';

import { ApplicationFormFields, IApplicationFormFields } from './ApplicationFormFields';

type ApplicationEditFormProps = {
  onSuccessCallback: () => void;
  record: IApplicationDTO;
};

export const ApplicationEditForm: FC<ApplicationEditFormProps> = (props) => {
  const { onSuccessCallback, record } = props;
  const translate = useTranslate();
  const [updateApplication] = useUpdateApplicationMutation();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.application.title.short().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.application.title.short().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IApplicationFormFields) => {
    try {
      const res = await updateApplication({
        config: formData.config ?? '',
        id: record.id,
        name: formData.name ?? '',
        enabled: formData.enabled ?? false,
        secret: formData.secret ?? '',
        type: formData.type ?? '',
        url: formData.url ?? '',
      });
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
      config: record.config ?? '',
      name: record.name ?? '',
      enabled: record.enabled,
      secret: record.secret,
      type: record.type ?? '',
      url: record.url ?? '',
    },
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
        <ApplicationFormFields
          record={record}
          onSuccessCallback={onSuccessCallback}
          {...controls}
        />
      )}
    />
  );
};
