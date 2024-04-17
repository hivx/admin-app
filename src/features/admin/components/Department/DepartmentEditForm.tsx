import { zodResolver } from '@hookform/resolvers/zod';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller, UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import {
  useGetListDepartmentsQuery,
  useUpdateDepartmentMutation,
} from '@/api/departments';
import { MyCheckbox, MyFormTextField, MyTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IDepartmentDTO, IDepartmentDTOUpdate } from '@/types/dto';
import { checkUpdateField } from '@/utils/checkUpdateFields';
import { mapUndefinedOrEmptyStringToNull } from '@/utils/format';

import { MIN_LENGTH_DEPARTMENT_NAME } from './DepartmentCreateForm';

type DepartmentEditFormProps = {
  onSuccessCallback: () => void;
  record: IDepartmentDTO;
};
export const DepartmentEditForm: FC<DepartmentEditFormProps> = (props) => {
  const { onSuccessCallback, record } = props;
  const [updateDepartment] = useUpdateDepartmentMutation();
  const { data } = useGetListDepartmentsQuery({
    filter: {},
  });
  const listDepartmentFiltedred = data?.list.filter((item) => item.id !== record.id);
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();

  const formOptions: UseFormProps<IDepartmentDTOUpdate> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        name: z
          .string()
          .trim()
          .min(
            MIN_LENGTH_DEPARTMENT_NAME,
            translate.messages.validation.genericMinLength({
              resource: translate.resources.department.name(),
              length: MIN_LENGTH_DEPARTMENT_NAME,
            }),
          ),
        code: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.department.code(),
            }),
          )
          .refine(
            (value) => {
              // check if there is any department code exist in the list EXCEPT itself
              if (
                listDepartmentFiltedred &&
                listDepartmentFiltedred.some((item) => item.code === value)
              ) {
                return false;
              }
              return true;
            },
            {
              message: translate.messages.validation.genericDuplicated({
                name: translate.resources.department.code(),
              }),
            },
          ),
        parentID: z.number().optional().transform(mapUndefinedOrEmptyStringToNull),
        description: z.string().optional().transform(mapUndefinedOrEmptyStringToNull),
        enabled: z.boolean().optional(),
      }),
    ),
    defaultValues: {
      name: record.name ?? '',
      code: record.code ?? '',
      description: record.description ?? '',
      parentID: record.parent?.id ?? undefined,
      enabled: record.enabled ?? false,
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.department.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.department.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IDepartmentDTOUpdate) => {
    const { updateData, canUpdate } = checkUpdateField<IDepartmentDTOUpdate>(
      Object.keys(formData) as (keyof IDepartmentDTOUpdate)[], // can be safely typecasted
      record as Partial<IDepartmentDTOUpdate>, // can be safely typecasted
      formData,
    );
    if (canUpdate) {
      try {
        const res = await updateDepartment({ ...updateData, id: record.id });
        if ('error' in res) {
          notifyError();
        } else {
          notifySuccess();
          onSuccessCallback();
        }
      } catch (e) {
        notifyError();
      }
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
      renderInputs={({ control, formState, onKeyDown }) => (
        <Stack spacing={1} alignItems="start" width="500px">
          <MyTextField value={record.id} label={'ID'} size="small" disabled fullWidth />
          <MyFormTextField
            name="name"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.department.name(),
              placeholder: translate.resources.department.name(),
              fullWidth: true,
              required: true,
              onKeyDown,
            }}
          />
          <MyFormTextField
            name="code"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.department.code(),
              placeholder: translate.resources.department.code(),
              fullWidth: true,
              required: true,
              onKeyDown,
            }}
          />
          <MyFormSelectField
            name="parentID"
            control={control}
            MySelectProps={{
              label: translate.resources.department.parent(),
            }}
          >
            <MenuItem key="null" value={0}>
              &nbsp;
            </MenuItem>
            {listDepartmentFiltedred &&
              listDepartmentFiltedred.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </MyFormSelectField>

          <MyFormTextField
            name="description"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.department.description(),
              placeholder: translate.resources.department.description(),
              fullWidth: true,
              onKeyDown,
              multiline: true,
              rows: 2,
            }}
          />
          <Box display="flex" alignItems="center">
            <Controller
              name="enabled"
              control={control}
              render={({ field: { value, onChange } }) => (
                <MyCheckbox checked={!!value} onChange={onChange} />
              )}
            />

            <Typography>{translate.resources.department.enabled()}</Typography>
          </Box>
        </Stack>
      )}
    />
  );
};
