import SearchIcon from '@mui/icons-material/Search';
import { AutocompleteRenderInputParams, IconButton } from '@mui/material';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { useTranslate } from '@/hooks';

import { MyTextField } from '../Elements';
import { MyAutoComplete } from '../Elements/Inputs/MyAutoComplete';
import { MyTooltip } from '../Elements/Tooltip/MyTooltip';

import { IMyAutoCompleteProp } from './MyFormAutoComplete';
import { StyledPrimaryFieldInsideTableHeader } from './StyledPrimaryFieldInsideTableHeader';

export type MyFormAutoCompleteProps<T extends FieldValues, K> = {
  loading?: boolean;
  name: FieldPath<T>;
  control?: Control<T>;
  label?: string;
  id?: string;
  size?: 'small' | 'medium';
  limitTags?: number;
  placeholder?: string;
  handleSubmit: () => void;
  /**
   * @default true
   */
  MyAutoCompleteProps: Omit<IMyAutoCompleteProp<K>, 'renderInput'> & {
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  };
};

export const MyFormPrimaryFilterSelectField = <T extends FieldValues, K>(
  props: MyFormAutoCompleteProps<T, K>,
) => {
  const { handleSubmit, MyAutoCompleteProps } = props;
  const translate = useTranslate();
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => {
        return (
          <StyledPrimaryFieldInsideTableHeader>
            <MyAutoComplete
              {...field}
              onChange={(e, data) => {
                field.onChange(data);
              }}
              id={props.id}
              size={props.size ?? 'small'}
              multiple
              disableCloseOnSelect
              limitTags={props.limitTags ?? 5}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <MyTextField
                  {...params}
                  size="small"
                  label={props.label}
                  placeholder={props.placeholder}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <MyTooltip title={translate.buttons.search()}>
                          <IconButton sx={{ padding: 0 }} onClick={handleSubmit}>
                            <SearchIcon />
                          </IconButton>
                        </MyTooltip>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
              {...MyAutoCompleteProps}
            />
          </StyledPrimaryFieldInsideTableHeader>
        );
      }}
    />
  );
};
