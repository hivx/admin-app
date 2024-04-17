import DoneAllIcon from '@mui/icons-material/DoneAll';
import { AutocompleteProps, IconButton, styled } from '@mui/material';
import { useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues, FieldError } from 'react-hook-form';

import { useTranslate } from '@/hooks';
import { CustomSizeField } from '@/types/CustomSizeFieldMui';
import { uuidv4 } from '@/utils/uuidv4';

import { MyTextField } from '../Elements';
import { MyAutoComplete } from '../Elements/Inputs/MyAutoComplete';
import { ErrorTooltip } from '../Elements/Tooltip/ErrorTooltip';
import { MyTooltip } from '../Elements/Tooltip/MyTooltip';

// import { IfakeData } from '@/features/admin/components/Modality/ModalityEditForm';

type Multiple = boolean | undefined;
type DisableClearable = boolean | undefined;
type FreeSolo = boolean | undefined;
export type IMyAutoCompleteProp<T> = AutocompleteProps<
  T,
  Multiple,
  DisableClearable,
  FreeSolo
>;

export type MyFormAutoCompleteProps<T extends FieldValues, K> = {
  loading?: boolean;
  name: FieldPath<T>;
  control?: Control<T>;
  label?: string;
  id?: string;
  limitTags?: number;
  placeholder?: string;
  error?: FieldError;
  /**
   * @default true
   */
  enableSelectAll?: boolean;
  MyAutoCompleteProps: Omit<IMyAutoCompleteProp<K>, 'renderInput' | 'size'> & {
    renderInput?: IMyAutoCompleteProp<K>['renderInput'];
    size?: IMyAutoCompleteProp<K>['size'] | CustomSizeField;
  };
};

export const MyFormAutoComplete = <T extends FieldValues, K>(
  props: MyFormAutoCompleteProps<T, K>,
) => {
  const { enableSelectAll, MyAutoCompleteProps, control } = props;
  const fieldState = control?.getFieldState(props.name);
  const errorMessage = fieldState?.error?.message;
  const hasError = !!fieldState?.error;

  const textFieldRef = useRef<HTMLDivElement>(null); // for tooltip to get anchor position
  const translate = useTranslate();

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => {
        return (
          <StyledMyFormAutoCompleteContainer>
            <ErrorTooltip
              errorMessage={errorMessage}
              fieldRef={textFieldRef}
              key={uuidv4()} // create a new component when re-render
            />
            <MyAutoComplete
              {...field}
              onChange={(e, data) => {
                field.onChange(data);
              }}
              ref={textFieldRef}
              id={props.id}
              size={MyAutoCompleteProps.size ?? 'small'}
              multiple
              disableCloseOnSelect
              fullWidth
              limitTags={props.limitTags ?? 5}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  size={MyAutoCompleteProps.size ?? 'small'}
                  label={props.label}
                  fullWidth
                  placeholder={props.placeholder}
                  error={!!hasError}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        {params.InputProps.startAdornment}
                        {enableSelectAll && (
                          <MyTooltip title={translate.buttons.selectAll()}>
                            <IconButton
                              onClick={() => field.onChange(MyAutoCompleteProps.options)}
                              size="small"
                            >
                              <DoneAllIcon />
                            </IconButton>
                          </MyTooltip>
                        )}
                      </>
                    ),
                  }}
                />
              )}
              {...MyAutoCompleteProps}
            />
          </StyledMyFormAutoCompleteContainer>
        );
      }}
    />
  );
};

const StyledMyFormAutoCompleteContainer = styled('div')`
  width: 100%;
`;
