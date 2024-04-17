import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import { MyCheckbox, MyFormCheckboxField, MyTextField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { IConfigDTO, IConfigForm } from '@/types/dto';

import { AttributeIdSelectField } from './AttributeIdSelectField';
import { AttributeValueField } from './attributeValueFields/AttributeValueField';

type ConfigFormFieldsProps = IFormControlInputProps<IConfigForm> & {
  record?: IConfigDTO;
};

/**
 * Common fields for form create and edit PACS
 */
export const ConfigFormFields: FC<ConfigFormFieldsProps> = (props) => {
  const translate = useTranslate();
  const { control, record, onKeyDown, watch } = props;
  return (
    <Stack width="400px" spacing={1}>
      {record && (
        <MyTextField value={record.id} label={'ID'} size="small" disabled fullWidth />
      )}
      <AttributeIdSelectField
        control={control}
        watch={watch}
        required={!record}
        disabled={!!record}
      />
      <AttributeValueField
        control={control}
        name="attributeValue"
        watch={watch}
        MyTextFieldProps={{
          label: translate.resources.config.attributeValue(),
          placeholder: translate.resources.config.attributeValue(),
          fullWidth: true,
          required: !record,
          size: 'small',
          onKeyDown,
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
            <Typography>{translate.resources.config.preferred()}</Typography>
          </Box>
        )}
        name="preferred"
      />
    </Stack>
  );
};
