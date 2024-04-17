import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { MyCheckbox } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';

import { SessionConfigFormField } from './DefaultInfoRadiolgyForm';

type CheckboxAutoFillTemplateFieldType = IFormControlInputProps<SessionConfigFormField>;

export const CheckboxAutoFillTemplate: FC<CheckboxAutoFillTemplateFieldType> = ({
  control,
}) => {
  const translate = useTranslate();
  return (
    <Box display="flex" alignItems="center">
      <Controller
        name="isAutoFillRadiologyContent"
        control={control}
        render={({ field: { value, onChange } }) => (
          <MyCheckbox checked={!!value} onChange={onChange} />
        )}
      />

      <Typography>{translate.buttons.autoSelectContentTemplate()}</Typography>
    </Box>
  );
};
