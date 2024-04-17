import { InputBaseComponentProps } from '@mui/material';
import { ComponentProps, ElementType, forwardRef } from 'react';
import MaskedInput from 'react-text-mask';

import { MyTextField, MyTextFieldProps } from './MyTextField';

const MyMaskedInput = forwardRef<MaskedInput, ComponentProps<typeof MaskedInput>>(
  (props, ref) => {
    return <MaskedInput ref={ref} {...props} />;
  },
);

MyMaskedInput.displayName = 'MyMaskedInput';

export const MyMaskTextField = forwardRef<HTMLDivElement, MyTextFieldProps>(
  (props, ref) => {
    const { value, onChange, InputProps, ...other } = props;
    return (
      <MyTextField
        {...other}
        ref={ref}
        InputProps={{
          value,
          inputComponent:
            MyMaskedInput as unknown as ElementType<InputBaseComponentProps>, // MaskedInput is not compatible with inputComponent from MUI
          onChange,
          ...InputProps,
        }}
      />
    );
  },
);

MyMaskTextField.displayName = 'MyMaskTextField';
