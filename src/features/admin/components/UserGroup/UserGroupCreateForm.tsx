import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IGroupDTOCreate } from '@/types/dto';

import { useCreateUserGroupMutation } from '../../api/userGroup';
import { useUserGroupForm } from '../../hooks/useUserGroupForm';

import { IUserGroupFormFields, UserGroupFormFields } from './UserGroupFormFields';

type UserGroupCreateFormProps = {
  onSuccessCallback: () => void;
};

export const UserGroupCreateForm = (props: UserGroupCreateFormProps) => {
  const translate = useTranslate();
  const { onSuccessCallback } = props;
  const [createUserGroup] = useCreateUserGroupMutation();
  const register = useRegisterAdminFunctions();

  const { listModality, listRole, listModule, listReport } = useUserGroupForm();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.group.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.group.title().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<IUserGroupFormFields> = {
    criteriaMode: 'all',
    resolver: zodResolver(
      z
        .object({
          name: z
            .string()
            .trim()
            .min(
              3,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.group.name.long(),
                length: 3,
              }),
            ),
          description: z.string().optional(),
          modalities: z.array(z.object({ id: z.number() })).optional(),
          modules: z.array(z.object({ id: z.number() })).optional(),
          roles: z.array(z.object({ id: z.string() })).optional(),
          reports: z.array(z.object({ id: z.string() })).optional(),
        })
        .transform((val) => {
          return {
            ...val,
            modalityIDs: val.modalities?.map((item) => item.id),
            moduleIDs: val.modules?.map((item) => item.id),
            roleIDs: val.roles?.map((item) => item.id),
            reportIDs: val.reports?.map((item) => item.id),
          };
        }),
    ),
    defaultValues: {
      name: '',
      description: '',
      modalities: [],
      modules: [],
      roles: [],
      modalityIDs: [],
      moduleIDs: [],
      reportIDs: [],
      roleIDs: [],
    },
  };

  const handleSubmit = async (formData: IUserGroupFormFields) => {
    try {
      const submitForm: IGroupDTOCreate = {
        name: formData.name,
        description: formData.description || '',
        modalityIDs: formData.modalityIDs,
        moduleIDs: formData.moduleIDs,
        reportIDs: formData.reportIDs,
        roleIDs: formData.roleIDs,
      };
      const res = await createUserGroup(submitForm);
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

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitCreateForm', () => formInstance.submit && formInstance.submit())
      }
      formOptions={formOptions}
      submitOnEnter
      onSubmit={handleSubmit}
      renderInputs={(controls) => (
        <UserGroupFormFields
          listModality={listModality}
          listRole={listRole}
          listModule={listModule}
          listReport={listReport}
          {...controls}
        />
      )}
    />
  );
};
