import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormTextField, MyTextField } from '@/components';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IModalityGroupDTO, IModalityGroupDTOUpdate } from '@/types/dto';
import { checkUpdateField } from '@/utils/checkUpdateFields';
import { mapUndefinedOrEmptyStringToNull } from '@/utils/format';

import {
  useUpdateModalityGroupMutation,
  useGetListModalityGroupQuery,
} from '../../../../api/modalityGroup';

type ModalityGroupEditFormProps = {
  onSuccessCallback: () => void;
  record: IModalityGroupDTO;
};
export const ModalityGroupEditForm: FC<ModalityGroupEditFormProps> = (props) => {
  const { onSuccessCallback, record } = props;
  const [updateModalityGroup] = useUpdateModalityGroupMutation();
  const { data } = useGetListModalityGroupQuery({
    filter: {},
  });
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();
  const listModalityGroupFiltedred = data?.list.filter((item) => item.id !== record.id);

  const formOptions: UseFormProps<IModalityGroupDTOUpdate> = {
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
              // check if there is any modalityGroup code exist in the list EXCEPT itself
              if (
                listModalityGroupFiltedred &&
                listModalityGroupFiltedred.some((item) => item.code === value)
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
        description: z.string().optional().transform(mapUndefinedOrEmptyStringToNull),
        index: z.union([z.string(), z.number()]),
      }),
    ),
    defaultValues: {
      name: record.name ?? '',
      index: record.index ?? undefined,
      code: record.code ?? '',
      description: record.description ?? '',
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.modalityGroup.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.modalityGroup.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IModalityGroupDTOUpdate) => {
    const { updateData, canUpdate } = checkUpdateField<IModalityGroupDTOUpdate>(
      Object.keys(formData) as (keyof IModalityGroupDTOUpdate)[], // can be safely typecasted
      record as Partial<IModalityGroupDTOUpdate>, // can be safely typecasted
      formData,
    );
    if (canUpdate) {
      try {
        const res = await updateModalityGroup({ ...updateData, id: record.id });
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
      renderInputs={({ control, onKeyDown }) => (
        <Stack spacing={1} alignItems="start" width="500px">
          <MyTextField value={record.id} size="small" label={'ID'} disabled fullWidth />
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
