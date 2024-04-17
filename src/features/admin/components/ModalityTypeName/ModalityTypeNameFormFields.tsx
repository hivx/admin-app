import { Stack } from '@mui/material';
import React from 'react';

import { MyFormTextField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { IModalityTypeNameDTO, IModalityTypeNameDTOUpdate } from '@/types/dto';

export type ModalityTypeNameFormFields = Partial<IModalityTypeNameDTOUpdate>;

export type ModalityTypeNameFormFieldsProps =
  IFormControlInputProps<ModalityTypeNameFormFields> & {
    record?: IModalityTypeNameDTO;
  };
export const ModalityTypeNameFormFields = (props: ModalityTypeNameFormFieldsProps) => {
  const { control, onKeyDown, record } = props;
  const translate = useTranslate();
  return (
    <>
      <Stack spacing={1} alignItems="start" width="500px">
        <MyFormTextField
          name="id"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modalityTypeName.id(),
            placeholder: translate.resources.modalityTypeName.id(),
            fullWidth: true,
            required: true,
            size: 'small',
            onKeyDown,
            disabled: !!record,
          }}
        />
        <MyFormTextField
          name="name"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.modalityTypeName.name(),
            placeholder: translate.resources.modalityTypeName.name(),
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
            label: translate.resources.modalityTypeName.description(),
            placeholder: translate.resources.modalityTypeName.description(),
            fullWidth: true,
            size: 'small',
            multiline: true,
            rows: 3,
            onKeyDown,
          }}
        />
      </Stack>
    </>
  );
};
