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
import { IProcedureGroupDTOCreate } from '@/types/dto';

import { useCreateProcedureGroupMutation } from '../../../features/admin/api/procedureGroup';

import { ProcedureAutocompleteField } from './ProcedureAutocompleteField';

type ProcedureGroupCreateFormProps = {
  onSuccessCallback: () => void;
};
export const ProcedureGroupCreateForm: FC<ProcedureGroupCreateFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const [createProcedureGroup] = useCreateProcedureGroupMutation();
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();

  const formOptions: UseFormProps<IProcedureGroupDTOCreate> = {
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
              resource: translate.resources.procedureGroup.name(),
            }),
          ),
        description: z.string().optional(),
        procedureIDs: z
          .array(z.object({ id: z.number() }))
          .transform((values) => values?.map((item) => item.id))
          .optional(),
      }),
    ),
    defaultValues: {
      name: '',
      description: '',
      procedureIDs: [],
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.procedureGroup.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.procedureGroup.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IProcedureGroupDTOCreate) => {
    try {
      const res = await createProcedureGroup(formData);
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
              label: translate.resources.procedureGroup.name(),
              placeholder: translate.resources.procedureGroup.name(),
              fullWidth: true,
              required: true,
              size: 'small',
              onKeyDown,
            }}
          />
          <MyFormTextField
            name="description"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.procedureGroup.description(),
              placeholder: translate.resources.procedureGroup.description(),
              fullWidth: true,
              onKeyDown,
              multiline: true,
              rows: 3,
            }}
          />
          <ProcedureAutocompleteField control={control} name="procedureIDs" />
        </Stack>
      )}
    />
  );
};
