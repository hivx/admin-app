import { Stack } from '@mui/material';
import React from 'react';

import { MyFormTextField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { IRoleDTO, IRoleDTOUpdate } from '@/types/dto';

import RoleNameSelectField from './RoleNameSelectField';

export type RoleFormFields = Partial<IRoleDTOUpdate>;

export type RoleFormFieldsProps = IFormControlInputProps<RoleFormFields> & {
  record?: IRoleDTO;
};
export const RoleFormFields = (props: RoleFormFieldsProps) => {
  const { control, onKeyDown, record } = props;
  const translate = useTranslate();
  return (
    <>
      <Stack spacing={1} alignItems="start" width="500px">
        <RoleNameSelectField readonly={!!record} control={control} />
        <MyFormTextField
          name="name"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.role.name(),
            placeholder: translate.resources.role.name(),
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
            label: translate.resources.role.description(),
            placeholder: translate.resources.role.description(),
            fullWidth: true,
            size: 'small',
            onKeyDown,
            multiline: true,
            rows: 3,
          }}
        />
      </Stack>
    </>
  );
};
