import { Box, Stack, Typography } from '@mui/material';
import { FieldValues } from 'react-hook-form';

import {
  MyCheckbox,
  MyFormCheckboxField,
  MyFormTextField,
  MyTextField,
} from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { IModalityDTO } from '@/types/dto';

import { IModalityFormFields } from './ModalityEditForm';
import { ModalityProcedureAutocompleteField } from './ModalityProcedureAutocompleteField';
import ModalityGroupSelectField from './SelectFields/ModalityGroupSelectField';
import ModalityRoomSelectField from './SelectFields/ModalityRoomSelectField';
import ModalityTypeSelectField from './SelectFields/ModalityTypeNameSelectField';

type ModalityFormFieldsProps<T extends FieldValues> = IFormControlInputProps<T> & {
  record?: IModalityDTO;
};

/**
 * Handles UI of Modality Form Fields
 */
export const ModalityFormFields = (
  props: ModalityFormFieldsProps<IModalityFormFields>,
) => {
  const { control, formState, onKeyDown, record, watch } = props;
  const translate = useTranslate();

  const watchModalityTypeName = watch('modalityType');

  return (
    <Box display="flex">
      <Stack spacing={1} alignItems="start" width="500px">
        {record && (
          <MyTextField value={record.id} size="small" label={'ID'} disabled fullWidth />
        )}
        <MyFormTextField
          name="name"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modality.name.short(),
            placeholder: translate.resources.modality.name.short(),
            fullWidth: true,
            required: true,
            onKeyDown,
          }}
        />
        <ModalityTypeSelectField control={control} watch={watch} />
        <ModalityGroupSelectField control={control} record={record} />

        <MyFormTextField
          name="ipAddress"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modality.ipAddress(),
            placeholder: translate.resources.modality.ipAddress(),
            fullWidth: true,
            onKeyDown,
          }}
        />

        <MyFormTextField
          name="institutionName"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modality.institutionName(),
            placeholder: translate.resources.modality.institutionName(),
            fullWidth: true,
            onKeyDown,
          }}
        />
        <MyFormTextField
          name="capability"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modality.capability(),
            placeholder: translate.resources.modality.capability(),
            fullWidth: true,
            size: 'small',
            type: 'number',
            onKeyDown,
          }}
        />
        {record && (
          <MyFormCheckboxField
            control={control}
            render={({ value, onChange }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MyCheckbox checked={!!value} onChange={onChange} />
                <Typography>{translate.resources.modality.enabled()}</Typography>
              </Box>
            )}
            name="enabled"
          />
        )}
      </Stack>
      <Stack width="500px" spacing={1} ml={4}>
        <MyFormTextField
          name="code"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modality.code.short(),
            placeholder: translate.resources.modality.code.short(),
            fullWidth: true,
            required: true,
            onKeyDown,
          }}
        />

        <ModalityRoomSelectField control={control} record={record} />

        <MyFormTextField
          name="aeTitle"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modality.aeTitle(),
            placeholder: translate.resources.modality.aeTitle(),
            fullWidth: true,
            onKeyDown,
          }}
        />
        <MyFormTextField
          name="manufacturerModelName"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modality.manufacturerModelName(),
            placeholder: translate.resources.modality.manufacturerModelName(),
            fullWidth: true,
            onKeyDown,
          }}
        />
        <MyFormTextField
          name="stationName"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modality.stationName(),
            placeholder: translate.resources.modality.stationName(),
            fullWidth: true,
            onKeyDown,
          }}
        />
        <ModalityProcedureAutocompleteField
          modalityTypeName={watchModalityTypeName}
          control={control}
          name="procedures"
        />
        <MyFormTextField
          name="config"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modality.config(),
            placeholder: translate.resources.modality.config(),
            fullWidth: true,
            size: 'small',
            multiline: true,
            minRows: 3,
          }}
        />
      </Stack>
    </Box>
  );
};
