import { MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';

import { AttributeValueFieldProps } from './AttributeValueField';

type AttributeValueSelectField = Pick<
  AttributeValueFieldProps,
  'control' | 'name' | 'MyTextFieldProps'
>;

/**
 * Component to select attributeValue
 * Use if datatype = BOOLEAN
 */
export const AttributeValueSelectField: FC<AttributeValueSelectField> = ({
  control,
  name,
  MyTextFieldProps,
}) => {
  return (
    <MyFormSelectField
      name={name}
      control={control}
      MySelectProps={{
        label: MyTextFieldProps?.label,
        disabled: MyTextFieldProps?.disabled,
      }}
    >
      <MenuItem key={'True'} value={'True'}>
        True
      </MenuItem>
      <MenuItem key={'False'} value={'False'}>
        False
      </MenuItem>
    </MyFormSelectField>
  );
};
