import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormTextField } from '@/components';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IModalityGroupDTOCreate } from '@/types/dto';

import {
  useGetListModalityGroupQuery,
  useCreateModalityGroupMutation,
} from '../../../../api/modalityGroup';

type ModalityGroupCreateFormProps = {
  onSuccessCallback: () => void;
};
export const ModalityGroupCreateForm: FC<ModalityGroupCreateFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const [createModalityGroup] = useCreateModalityGroupMutation();
  const { data } = useGetListModalityGroupQuery({
    filter: {},
  });
  const listModalityGroup = data?.list;
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();

  const formOptions: UseFormProps<IModalityGroupDTOCreate> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        name: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.modalityGroup.code(),
            }),
          ),
        code: z
          .string()
          .trim()
          .min(
            1,
            translate.messages.validation.genericRequired({
              resource: translate.resources.modalityGroup.code(),
            }),
          )
          .refine(
            (value) => {
              // check if there is any modalityGroup code exist in the list
              if (
                listModalityGroup &&
                listModalityGroup.some((item) => item.code === value)
              ) {
                return false;
              }
              return true;
            },
            {
              message: translate.messages.validation.genericDuplicated({
                name: translate.resources.modalityGroup.code(),
              }),
            },
          ),
        description: z.string().optional(),
        index: z.union([z.string(), z.number()]).optional(),
      }),
    ),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      index: undefined,
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.modalityGroup.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.modalityGroup.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IModalityGroupDTOCreate) => {
    try {
      const res = await createModalityGroup(formData);
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
      renderInputs={({ control, onKeyDown }) => (
        <Stack spacing={1} alignItems="start" width="500px">
          <MyFormTextField
            name="name"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.modalityGroup.name(),
              placeholder: translate.resources.modalityGroup.name(),
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
              label: translate.resources.modalityGroup.code(),
              placeholder: translate.resources.modalityGroup.code(),
              fullWidth: true,
              required: true,
              size: 'small',
              onKeyDown,
            }}
          />
          <MyFormTextField
            name="index"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.modalityGroup.index(),
              placeholder: translate.resources.modalityGroup.index(),
              fullWidth: true,
              size: 'small',
              type: 'number',
              onKeyDown,
            }}
          />
          <MyFormTextField
            name="description"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.modalityGroup.description(),
              placeholder: translate.resources.modalityGroup.description(),
              fullWidth: true,
              onKeyDown,
              multiline: true,
              rows: 2,
            }}
          />
        </Stack>
      )}
    />
  );
};
