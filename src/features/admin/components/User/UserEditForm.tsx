import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetListUsersQuery, useUpdateUserMutation } from '@/api/users';
import { MIN_LENGTH_CONTENT_NAME } from '@/components/Admin/Content/ContentCreateForm';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IGroupDTO, IModalityDTO, IRoleDTO, IUserUpdateDTO } from '@/types/dto';
import { IUserGroupDTO } from '@/types/dto/userGroup';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { useUserForm } from '../../hooks/useUserForm';

import { UserFormFields } from './UserFormFields';

export type UserEditFormProps = {
  onSuccessCallback: () => void;
  record: IUserUpdateDTO;
  listRole: IRoleDTO[];
  listGroup: IGroupDTO[];
  listModality: IModalityDTO[];
};
export const UserEditForm = (props: UserEditFormProps) => {
  const { onSuccessCallback, record, listGroup, listModality, listRole } = props;
  const register = useRegisterAdminFunctions();
  const translate = useTranslate();
  const [updateUser] = useUpdateUserMutation();

  const { data } = useGetListUsersQuery({
    filter: {},
  });

  const listUserFiltedred = data?.list.filter((item) => item.id !== record.id);

  const { modalityData, roleData, userGroupData } = useUserForm();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.user.name().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.user.name().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<UserFormFields> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z
        .object({
          certificateID: z.number().optional(),
          code: z
            .string()
            .trim()
            .min(
              MIN_LENGTH_CONTENT_NAME,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.user.code(),
                length: MIN_LENGTH_CONTENT_NAME,
              }),
            )
            .refine(
              (value) => {
                // check if there is any user code exist in the list
                if (
                  listUserFiltedred &&
                  listUserFiltedred.some((item) => item.code === value)
                ) {
                  return false;
                }
                return true;
              },
              {
                message: translate.messages.validation.genericDuplicated({
                  name: translate.resources.user.code(),
                }),
              },
            ),
          departmentID: z.number({
            required_error: translate.messages.validation.genericRequired({
              resource: translate.resources.user.department(),
            }),
          }),
          email: z.string().trim().optional(),
          enabled: z.boolean().optional(),
          fullname: z
            .string()
            .trim()
            .min(
              MIN_LENGTH_CONTENT_NAME,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.user.fullname(),
                length: MIN_LENGTH_CONTENT_NAME,
              }),
            ),
          groupIDs: z.array(z.string()).optional(),
          groups: z.array(z.object({ id: z.number() })).optional(),
          level: z
            .union([z.string(), z.number()])
            .transform((value) => (typeof value === 'string' ? parseInt(value) : value))
            .optional(),
          modalityIDs: z.array(z.number()).optional(),
          modalities: z.array(z.object({ id: z.number() })).optional(),
          roles: z.array(z.object({ id: z.string() })).optional(),
          // phần update thì không cần bắt cảnh báo 'bắt buộc nhập' trường password
          // nếu nhập password thì vẫn có cảnh báo 'tối thiếu 3 kí tự'
          password: z
            .string()
            .trim()
            .transform(mapNullOrEmptyStringToUndefined)
            .refine(
              (value) => {
                if (typeof value === 'string') {
                  return value.length >= MIN_LENGTH_CONTENT_NAME;
                }
                return true;
              },
              {
                message: translate.messages.validation.genericMinLength({
                  resource: translate.resources.user.password(),
                  length: MIN_LENGTH_CONTENT_NAME,
                }),
              },
            ),
          phone: z.string().trim().optional(),
          roleIDs: z.array(z.string()).optional(),
          signature: z.string().optional(),
          avatar: z.string().optional(),
          title: z.string().optional(),
          type: z.string().optional(),
          username: z
            .string()
            .trim()
            .min(
              MIN_LENGTH_CONTENT_NAME,
              translate.messages.validation.genericMinLength({
                resource: translate.resources.user.username(),
                length: MIN_LENGTH_CONTENT_NAME,
              }),
            )
            .refine(
              (value) => {
                // check if there is any username exist in the list
                if (
                  listUserFiltedred &&
                  listUserFiltedred.some((item) => item.username === value)
                ) {
                  return false;
                }
                return true;
              },
              {
                message: translate.messages.validation.genericDuplicated({
                  name: translate.resources.user.username(),
                }),
              },
            ),
        })
        .transform((val) => {
          return {
            ...val,
            groupIDs: val.groups ? val.groups.map((item) => item.id) : undefined,
            modalityIDs: val.modalities
              ? val.modalities.map((item) => item.id)
              : undefined,
            roleIDs: val.roles ? val.roles.map((item) => item.id) : undefined,
            roles: undefined,
            groups: undefined,
            modalities: undefined,
          };
        }),
    ),
    defaultValues: {
      username: record.username ?? '',
      code: record.code ?? '',
      fullname: record.fullname ?? '',
      password: record.password ?? '',
      departmentID: record.department?.id,
      certificateID: record?.certificate?.id ?? undefined,
      level: record.level ?? undefined,
      email: record.email ?? undefined,
      phone: record.phone ?? undefined,
      type: record.type,
      groups: record?.groups,
      modalities: record?.modalities ?? undefined,
      roles: record?.roles,
      signature: record?.signature ?? undefined,
      avatar: record?.avatar ?? undefined,
      enabled: record?.enabled ?? false,
    },
  };
  const handleSubmit = async (formData: UserFormFields) => {
    try {
      const submitForm: IUserUpdateDTO = {
        id: record.id,
        certificateID: formData.certificateID,
        code: formData.code,
        departmentID: formData.departmentID,
        email: formData.email,
        fullname: formData.fullname,
        groupIDs: formData.groupIDs,
        level: formData.level,
        modalityIDs: formData.modalityIDs,
        password: formData.password,
        phone: formData.phone,
        roleIDs: formData.roleIDs,
        signature: formData.signature,
        type: formData.type,
        username: formData.username,
        avatar: formData.avatar,
        enabled: formData.enabled,
      };
      const res = await updateUser(submitForm);
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
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => (
        <UserFormFields
          {...controls}
          listGroup={userGroupData?.list || []}
          listModality={modalityData?.list || []}
          listRole={roleData?.list || []}
          record={record}
        />
      )}
    />
  );
};
