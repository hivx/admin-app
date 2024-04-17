import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MIN_LENGTH_CONTENT_NAME } from '@/components/Admin/Content/ContentCreateForm';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IRoleDTOCreate } from '@/types/dto';

import { useCreateRoleMutation } from '../../api/role';

import { RoleFormFields } from './RoleFormFields';

export type RoleCreateFormProps = { onSuccessCallback?: () => void };
export const RoleCreateForm = (props: RoleCreateFormProps) => {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const translate = useTranslate();
  const [createRole] = useCreateRoleMutation();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.role.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.role.title().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<RoleFormFields> = {
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
              resource: translate.resources.role.id(),
            }),
          ),
        name: z
          .string()
          .trim()
          .min(
            MIN_LENGTH_CONTENT_NAME,
            translate.messages.validation.genericMinLength({
              resource: translate.resources.role.name(),
              length: MIN_LENGTH_CONTENT_NAME,
            }),
          ),
        description: z.string().optional().nullable(),
      }),
    ),
    defaultValues: {
      name: '',
      id: '',
      description: null,
    },
  };
  const handleSubmit = async (formData: RoleFormFields) => {
    try {
      const submitForm: IRoleDTOCreate = {
        id: formData.id ?? '',
        name: formData.name ?? '',
        description: formData.description ?? null,
      };
      const res = await createRole(submitForm);
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
      renderInputs={(controls) => <RoleFormFields {...controls} />}
    />
  );
};
