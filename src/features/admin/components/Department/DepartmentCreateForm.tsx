import { zodResolver } from '@hookform/resolvers/zod';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import {
  useCreateDepartmentMutation,
  useGetListDepartmentsQuery,
} from '@/api/departments';
import { MyCheckbox, MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IDepartmentDTOCreate } from '@/types/dto';

export const MIN_LENGTH_DEPARTMENT_NAME = 3;
type DepartmentCreateFormProps = {
  onSuccessCallback: () => void;
};
export const DepartmentCreateForm: FC<DepartmentCreateFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const [createDepartment] = useCreateDepartmentMutation();

  const { data } = useGetListDepartmentsQuery({
    filter: {},
  });
  const listDepartment = data?.list;
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.department.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.department.title().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<IDepartmentDTOCreate> = {
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
              // check if there is any department code exist in the list
              if (listDepartment && listDepartment.some((item) => item.code === value)) {
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
        parentID: z.preprocess((id) => (id ? id : undefined), z.number().optional()),
        description: z.string().optional(),
      }),
    ),
    defaultValues: {
      name: '',
      code: '',
      description: '',
    },
  };

  const handleSubmit = async (formData: IDepartmentDTOCreate) => {
    try {
      const res = await createDepartment(formData);
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
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={({ control, formState, onKeyDown }) => (
        <Stack spacing={1} alignItems="start" width="500px">
          <MyFormTextField
            name="name"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.department.name(),
              placeholder: translate.resources.department.name(),
              fullWidth: true,
              required: true,
              onKeyDown,
              size: 'extrasmall',
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
              size: 'extrasmall',
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
            {listDepartment &&
              listDepartment.map((item) => (
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
            <MyCheckbox checked />
            <Typography>{translate.resources.department.enabled()}</Typography>
          </Box>
        </Stack>
      )}
    />
  );
};
