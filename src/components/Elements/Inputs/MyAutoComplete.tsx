import { Autocomplete, AutocompleteProps, CircularProgress, styled } from '@mui/material';
import { Ref, RefObject } from 'react';

import { useTranslate } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { CustomSizeField } from '@/types/CustomSizeFieldMui';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { DropdownPaper } from '../Surfaces/DropdownPaper';

import { MyTextField, MyTextFieldProps } from './MyTextField';

export type IMyAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  'renderInput' | 'size'
> & {
  ref?: Ref<unknown> | RefObject<unknown>;
  renderInput?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['renderInput'];
  MyTextFieldProps?: Partial<MyTextFieldProps>;
  size?:
    | AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['size']
    | CustomSizeField;
};

export const MyAutoComplete = <
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  props: IMyAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>,
) => {
  const { MyTextFieldProps, size, ...AutocompleteProps } = props;
  const translate = useTranslate();

  let muiSize: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['size'];
  let customSize: CustomSizeField;
  if (size === 'medium' || size === 'small') muiSize = size;
  else {
    customSize = size;
  }

  return (
    <StyledAutoCompleteField $customSize={customSize}>
      <Autocomplete<T, Multiple, DisableClearable, FreeSolo>
        ref={props.ref}
        size={muiSize}
        multiple={true as Multiple}
        sx={{ backgroundColor: 'background.default' }}
        PaperComponent={DropdownPaper}
        disableCloseOnSelect
        limitTags={5}
        noOptionsText={translate.messages.result.noData()}
        renderInput={(params) => (
          <MyTextField
            {...params}
            size={customSize ?? muiSize}
            placeholder={props.placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {props.loading && <CircularProgress size="1rem" />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            {...MyTextFieldProps}
          />
        )}
        {...AutocompleteProps}
      />
    </StyledAutoCompleteField>
  );
};

const StyledAutoCompleteField = styled('div', filterTransientProps)<{
  $customSize?: CustomSizeField;
}>`
  > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root.Mui-disabled {
    background-color: ${(props) =>
      props.theme?.pacs?.customColors.fieldDisabledBackground};
  }
  .MuiAutocomplete-root .MuiAutocomplete-tag {
    color: ${(props) => props.theme.pacs?.customColors.autoCompleteTagColor};
  }

  ${(props) => {
    switch (props.$customSize) {
      case 'extrasmall':
        return globalStyles.extraSmallAutoCompleteField;
    }
  }}
`;
