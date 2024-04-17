import { styled, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';
import { CustomSizeField } from '@/types/CustomSizeFieldMui';
import { filterTransientProps } from '@/utils/filterTransientProps';

export type MyTextFieldProps = Omit<TextFieldProps, 'size'> & {
  size?: TextFieldProps['size'] | CustomSizeField;
};

const StyledTextField = styled(TextField, filterTransientProps)<{
  $customSize: CustomSizeField;
}>`
  & .MuiOutlinedInput-input::placeholder {
    color: ${(props) => props.theme.pacs?.customColors.text.black};
  }
  & .MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    border-color: ${(props) => props.theme.pacs?.customColors.notchedOutlineInputColor};
  }
  & > .MuiInputBase-root {
    background-color: ${(props) => props.theme.palette.background.default};

    & > .MuiInputBase-input.Mui-disabled {
      background-color: ${(props) =>
        props.theme?.pacs?.customColors.fieldDisabledBackground};
      -webkit-text-fill-color: ${(props) => props.theme.palette.text.primary};
    }
    &:hover {
      & > .MuiOutlinedInput-notchedOutline {
        border-color: ${(props) =>
          props.theme.pacs?.customColors.notchedOutlineInputColor};
      }
      & > .MuiInputAdornment-root .MuiSvgIcon-root,
      .MuiAutocomplete-endAdornment .MuiSvgIcon-root {
        color: ${(props) => props.theme.palette.primary.main};
      }
    }
  }
  & > .MuiInputBase-root.Mui-disabled {
    padding-right: 0;

    & > .MuiInputAdornment-root {
      background-color: ${(props) =>
        props.theme?.pacs?.customColors.fieldDisabledBackground};
      -webkit-text-fill-color: ${(props) => props.theme.palette.text.primary};
      height: 100%;
      margin-left: 0;
      max-height: none;
    }
  }
  .MuiInputBase-multiline.Mui-disabled {
    padding: 0;
    > textarea {
      padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
    }
  }

  ${(props) => {
    switch (props.$customSize) {
      case 'extrasmall':
        return globalStyles.extraSmallTextField;
    }
  }}
`;

export const MyTextField = forwardRef<HTMLDivElement, MyTextFieldProps>((props, ref) => {
  const { size } = props;
  let muiSize: TextFieldProps['size'];
  let customSize: CustomSizeField;
  if (size === 'medium' || size === 'small') muiSize = size;
  else {
    customSize = size;
  }
  return <StyledTextField ref={ref} {...props} size={muiSize} $customSize={customSize} />;
});

MyTextField.displayName = 'MuiTextField';
