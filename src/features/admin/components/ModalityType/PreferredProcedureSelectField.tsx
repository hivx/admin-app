import { MenuItem } from '@mui/material';
import React from 'react';
import { FieldValues, Path, Control } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';

import { useModalityTypeForm } from '../../hooks/useModalityTypeForm';

type PreferredProcedureSelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  modalityType?: string;
};

export const PreferredProcedureSelectField = <T extends FieldValues>(
  props: PreferredProcedureSelectFieldProps<T>,
) => {
  const translate = useTranslate();
  const { control, modalityType, name } = props;

  const { procedures } = useModalityTypeForm({ modalityType });
  return (
    <MyFormSelectField
      name={name}
      control={control}
      MySelectProps={{
        label: translate.resources.modalityType.preferredProcedure(),
        placeholder: translate.resources.modalityType.preferredProcedure(),
        fullWidth: true,
      }}
    >
      <MenuItem key="null" value={0}>
        &nbsp;
      </MenuItem>
      {procedures &&
        procedures?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
    </MyFormSelectField>
  );
};
