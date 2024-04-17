import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { UseFormWatch } from 'react-hook-form';

import {
  MyCheckbox,
  MyFormCheckboxField,
  MyFormTextField,
  MyTextField,
} from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { IApplicationDTO, IApplicationUpdateDTO } from '@/types/dto/application';

import { ApplicationTypeSelectField } from './ApplicationTypeSelectField';

export type IApplicationFormFields = Partial<IApplicationUpdateDTO>;

type ApplicationFormFieldsProps = IFormControlInputProps<IApplicationFormFields> & {
  record?: IApplicationDTO;
  onSuccessCallback: () => void;
  watch?: UseFormWatch<IApplicationFormFields>;
};
export const ApplicationFormFields: FC<ApplicationFormFieldsProps> = (props) => {
  const { record, control, onKeyDown, watch } = props;
  const translate = useTranslate();
  return (
    <Stack spacing={1} alignItems="start" width="500px">
      {record && (
        <MyTextField value={record.id} size="small" label={'ID'} disabled fullWidth />
      )}
      <ApplicationTypeSelectField control={control} watch={watch} required />
      <MyFormTextField
        name="name"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.application.name(),
          placeholder: translate.resources.application.name(),
          fullWidth: true,
          required: true,
          size: 'small',
          onKeyDown,
        }}
      />
      <MyFormTextField
        name="url"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.application.url(),
          placeholder: translate.resources.application.url(),
          fullWidth: true,
          required: true,
          size: 'small',
          onKeyDown,
        }}
      />
      <MyFormTextField
        name="secret"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.application.secret(),
          placeholder: translate.resources.application.secret(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
        }}
      />
      <MyFormTextField
        name="config"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.application.config(),
          placeholder: translate.resources.application.config(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
          multiline: true,
          minRows: 3,
        }}
      />
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
            <Typography>{translate.resources.application.preferred()}</Typography>
          </Box>
        )}
        name="enabled"
      />
    </Stack>
  );
};
