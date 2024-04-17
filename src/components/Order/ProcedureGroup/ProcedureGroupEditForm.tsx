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
import { IProcedureDTO, IProcedureGroupDTO, IProcedureGroupDTOUpdate } from '@/types/dto';

import { useUpdateProcedureGroupMutation } from '../../../features/admin/api/procedureGroup';

import { ProcedureAutocompleteField } from './ProcedureAutocompleteField';

type ProcedureGroupEditFormProps = {
  onSuccessCallback: () => void;
  record: IProcedureGroupDTO;
  procedureSelected: IProcedureDTO[];
};

type IProcedureGroupEditForm = IProcedureGroupDTOUpdate & {
  procedures?: IProcedureDTO[];
};
export const ProcedureGroupEditForm: FC<ProcedureGroupEditFormProps> = (props) => {
  const { onSuccessCallback, record, procedureSelected } = props;
  const translate = useTranslate();
  const register = useRegisterAdminFunctions();
  const [updateProcedureGroup] = useUpdateProcedureGroupMutation();
  const formOptions: UseFormProps<IProcedureGroupEditForm> = {
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
        procedures: z
          .array(z.object({ id: z.number() }))
          // .transform((procedure) => procedure?.map((item) => item.id))
          .optional(),
      }),
    ),
    defaultValues: {
      name: record.name ?? '',
      description: record.description ?? '',
      procedures: procedureSelected,
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.procedureGroup.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.procedureGroup.title().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IProcedureGroupEditForm) => {
    const { procedures, ...rest } = formData;
    type IProcedureGroupEditFormSubmit = Omit<IProcedureGroupEditForm, 'procedures'>;
    const formDataWithProcedureIDs: IProcedureGroupEditFormSubmit = {
      procedureIDs: procedures?.map((item) => item.id),
      ...rest,
    };
    try {
      const res = await updateProcedureGroup({
        ...formDataWithProcedureIDs,
        id: record.id,
      });
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
      renderInputs={({ control, onKeyDown }) => (
        <Stack spacing={1} alignItems="start" width="500px">
          <MyTextField value={record.id} label={'ID'} size="small" disabled fullWidth />
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
          <ProcedureAutocompleteField control={control} name="procedures" />
        </Stack>
      )}
    />
  );
};
