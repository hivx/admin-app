import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IGroupDTO, IGroupDTOUpdate } from '@/types/dto';

import { useUpdateUserGroupMutation } from '../../api/userGroup';
import { useUserGroupForm } from '../../hooks/useUserGroupForm';

import { IUserGroupFormFields, UserGroupFormFields } from './UserGroupFormFields';

type UserGroupEditFormProps = {
  record: IGroupDTO;
  onSuccessCallback: () => void;
};

export const UserGroupEditForm = (props: UserGroupEditFormProps) => {
  const { record, onSuccessCallback } = props;
  const [updateUserGroup] = useUpdateUserGroupMutation();

  const translate = useTranslate();

  const register = useRegisterAdminFunctions();

  const { listModality, listRole, listModule, listReport } = useUserGroupForm();
  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.group.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
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
      name: record.name || '',
      description: record.description || '',
      modalities: record.modalities || [],
      modules: record.modules || [],
      roles: record.roles || [],
      modalityIDs: [],
      moduleIDs: [],
      roleIDs: [],
    },
  };

  const handleSubmit = async (formData: IUserGroupFormFields) => {
    try {
      const submitEditForm: IGroupDTOUpdate = {
        name: formData.name,
        modalityIDs: formData.modalityIDs,
        moduleIDs: formData.moduleIDs,
        roleIDs: formData.roleIDs,
        id: record.id,
        description: formData.description || '',
      };
      const res = await updateUserGroup({ ...submitEditForm });
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
        register('submitEditForm', () => formInstance.submit && formInstance.submit())
      }
      formOptions={formOptions}
      submitOnEnter
      onSubmit={handleSubmit}
      renderInputs={(controls) => (
        <UserGroupFormFields
          listModality={listModality}
          record={record}
          listRole={listRole}
          listModule={listModule}
          listReport={listReport}
          {...controls}
        />
      )}
    />
  );
};
