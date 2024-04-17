import { Stack } from '@mui/material';
import { FC } from 'react';

import { MyFormTextField, MyTextField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import MyPasswordForm from '@/components/Form/MyPasswordForm';
import { useTranslate } from '@/hooks';
import { ICertificateDTO } from '@/types/dto';

export type ICertificateFormFields = Partial<ICertificateDTO>;

type CertificateFormFieldsProps = IFormControlInputProps<ICertificateFormFields> & {
  record?: ICertificateDTO;
};
export const CertificateFormFields: FC<CertificateFormFieldsProps> = (props) => {
  const { record, control, onKeyDown } = props;
  const translate = useTranslate();
  return (
    <Stack spacing={1} alignItems="start" width="500px">
      {record && (
        <MyTextField value={record.id} size="small" label={'ID'} disabled fullWidth />
      )}
      <MyFormTextField
        name="account"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.certificate.account(),
          placeholder: translate.resources.certificate.account(),
          fullWidth: true,
          required: true,
          size: 'small',
          onKeyDown,
        }}
      />
      <MyPasswordForm
        name="maskedSecret"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.certificate.secret(),
          placeholder: translate.resources.certificate.secret(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
          autoComplete: 'new-password',
        }}
      />

      <MyFormTextField
        name="name"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.certificate.name(),
          placeholder: translate.resources.certificate.name(),
          fullWidth: true,
          required: true,
          size: 'small',
          onKeyDown,
        }}
      />
      <MyFormTextField
        name="provider"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.certificate.provider(),
          placeholder: translate.resources.certificate.provider(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
        }}
      />
      <MyFormTextField
        name="config"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.certificate.config(),
          placeholder: translate.resources.certificate.config(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
          multiline: true,
          minRows: 3,
        }}
      />
    </Stack>
  );
};
