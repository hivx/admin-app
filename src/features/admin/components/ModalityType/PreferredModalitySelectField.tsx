import { MenuItem } from '@mui/material';
import React from 'react';
import { FieldValues, Path, Control } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';

import { useModalityTypeForm } from '../../hooks/useModalityTypeForm';

type PreferredModalitySelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  modalityType?: string;
};

export const PreferredModalitySelectField = <T extends FieldValues>(
  props: PreferredModalitySelectFieldProps<T>,
) => {
  const translate = useTranslate();
  const { control, modalityType, name } = props;

  const { modalities } = useModalityTypeForm({ modalityType });
  return (
    <MyFormSelectField
      name={name}
      control={control}
      MySelectProps={{
        label: translate.resources.modalityType.preferredModality(),
        placeholder: translate.resources.modalityType.preferredModality(),
        fullWidth: true,
      }}
    >
      <MenuItem key="null" value={0}>
        &nbsp;
      </MenuItem>
      {modalities &&
        modalities?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
    </MyFormSelectField>
  );
};
