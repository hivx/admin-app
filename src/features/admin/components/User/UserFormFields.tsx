import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

import { MyCheckbox, MyFormTextField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import {
  IGroupDTO,
  IModalityDTO,
  IRoleDTO,
  IUserCreateDTO,
  IUserUpdateDTO,
} from '@/types/dto';

import { ModalityAutoCompleteFieldsFields } from './ModalityAutoCompleteFields';
import { RoleAutoCompleteFieldsFields } from './RoleAutoCompleteFields';
import { CertificateSelectField } from './SelectFields/CertificateSelectField';
import { DepartmentSelectField } from './SelectFields/DepartmentSelectField';
import { UserTypeSelectField } from './SelectFields/UserTypeSelectField';
import { UserFormUploadImage } from './UserFormUploadImage';
import { UserGroupAutoCompleteFields } from './UserGroupAutoCompleteFields';

export type UserFormFields = Partial<
  Omit<IUserCreateDTO, 'fullname' | 'username' | 'code' | 'password'>
> & {
  fullname: string;
  username: string;
  code: string;
  password: string;
  groupIDs?: IGroupDTO['id'][];
  modalities?: IModalityDTO[];
};

export type UserFormFieldsProps = IFormControlInputProps<UserFormFields> & {
  listModality: IModalityDTO[];
  listRole: IRoleDTO[];
  listGroup: IGroupDTO[];
  record?: IUserUpdateDTO;
};
export const UserFormFields = (props: UserFormFieldsProps) => {
  const { control, onKeyDown, record, setValue, watch } = props;
  const translate = useTranslate();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <MyFormTextField
              name="fullname"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.user.fullname(),
                placeholder: translate.resources.user.fullname(),
                fullWidth: true,
                required: true,
                size: 'small',
                onKeyDown,
              }}
            />
            <MyFormTextField
              name="code"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.user.code(),
                placeholder: translate.resources.user.fullname(),
                fullWidth: true,
                required: true,
                size: 'small',
                onKeyDown,
              }}
            />
            <DepartmentSelectField
              control={control}
              watch={watch}
              disableValue={record?.department?.name ?? ''}
            />
            <MyFormTextField
              name="phone"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.user.phone(),
                placeholder: translate.resources.user.phone(),
                fullWidth: true,
                size: 'small',
                onKeyDown,
              }}
            />
            <MyFormTextField
              name="email"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.user.email(),
                placeholder: translate.resources.user.email(),
                fullWidth: true,
                size: 'small',
                onKeyDown,
              }}
            />
            <UserTypeSelectField
              control={control}
              watch={watch}
              disableValue={record?.type ?? ''}
            />
            <Box display="flex" alignItems="center">
              <Controller
                name="enabled"
                control={control}
                render={({ field: { ...controllerRenderProps } }) => (
                  <MyCheckbox
                    {...controllerRenderProps}
                    checked={!!controllerRenderProps.value}
                  />
                )}
              />

              <Typography>{translate.resources.user.enabled()}</Typography>
            </Box>
            <UserFormUploadImage
              name="avatar"
              title={translate.resources.user.avatar()}
              image={record?.avatar ?? ''}
              setValue={setValue}
            />
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack spacing={2}>
            <MyFormTextField
              name="username"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.user.username(),
                placeholder: translate.resources.user.username(),
                fullWidth: true,
                required: true,
                size: 'small',
                onKeyDown,
              }}
            />
            <MyFormTextField
              name="password"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.user.password(),
                placeholder: translate.resources.user.password(),
                fullWidth: true,
                required: !record,
                size: 'small',
                onKeyDown,
              }}
            />

            <MyFormTextField
              name="level"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.user.level(),
                placeholder: translate.resources.user.level(),
                fullWidth: true,
                size: 'small',
                type: 'number',
                onKeyDown,
              }}
            />
            <UserGroupAutoCompleteFields name="groups" control={control} />
            <RoleAutoCompleteFieldsFields name="roles" control={control} />
            <ModalityAutoCompleteFieldsFields name="modalities" control={control} />
            <CertificateSelectField
              control={control}
              watch={watch}
              disableValue={record?.certificate?.name ?? ''}
            />
            <UserFormUploadImage
              name="signature"
              title={translate.resources.user.imgSignature()}
              image={record?.signature ?? ''}
              setValue={setValue}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
