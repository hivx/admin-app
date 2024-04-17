import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MIN_LENGTH_CONTENT_NAME } from '@/components/Admin/Content/ContentCreateForm';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IRoleDTO, IRoleDTOUpdate } from '@/types/dto';

import { useUpdateRoleMutation } from '../../api/role';

import { RoleFormFields } from './RoleFormFields';

export type RoleEditFormProps = { onSuccessCallback?: () => void; record: IRoleDTO };
export const RoleEditForm = (props: RoleEditFormProps) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const translate = useTranslate();
  const [editRole] = useUpdateRoleMutation();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.role.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
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
      id: record.id,
      name: record.name,
      description: record.description,
    },
  };

  const handleSubmit = async (formData: RoleFormFields) => {
    try {
      const submitForm: IRoleDTOUpdate = {
        id: formData.id ?? '',
        name: formData.name ?? '',
        description: formData.description ?? '',
      };
      const res = await editRole(submitForm);
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
      renderInputs={(controls) => <RoleFormFields record={record} {...controls} />}
    />
  );
};
