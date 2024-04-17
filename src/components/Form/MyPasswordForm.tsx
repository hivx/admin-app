import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { ReactEventHandler, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { MyFormTextField, MyFormTextFieldProps } from '@/components';
import { useTranslate } from '@/hooks/useTranslate';

const MyPasswordForm = <T extends FieldValues>(props: MyFormTextFieldProps<T>) => {
  const { name, control, MyTextFieldProps } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const translate = useTranslate();

  const handleClickShowPassword: ReactEventHandler<HTMLButtonElement> = () => {
    setShowPassword((current) => !current);
  };

  return (
    <MyFormTextField
      name={name}
      control={control}
      MyTextFieldProps={{
        fullWidth: true,
        required: true,
        size: 'medium',
        type: showPassword ? 'text' : 'password',
        placeholder: translate.resources.user.password(),
        ...MyTextFieldProps,
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default MyPasswordForm;
