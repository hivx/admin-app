import React, { FC } from 'react';
import { Control, FieldPath } from 'react-hook-form';

import { MyFormTextField } from '@/components/Elements';
import { useTranslate } from '@/hooks';
import { IPatientDTO } from '@/types/dto';

type PatientIdFieldProps = {
  name: FieldPath<IPatientDTO>;
  control: Control<IPatientDTO>;
  disabled?: boolean;
};

/**
 * Dùng trong form sửa Chỉ định
 */
const PatientIdFieldEdit: FC<PatientIdFieldProps> = (props) => {
  const { control, disabled, name } = props;
  const translate = useTranslate();

  return (
    <MyFormTextField
      name={name}
      control={control}
      MyTextFieldProps={{
        label: translate.resources.patient.id(),
        placeholder: translate.resources.patient.id(),
        fullWidth: true,
        size: 'small',
        disabled: disabled,
        required: true,
      }}
    />
  );
};

export default PatientIdFieldEdit;
