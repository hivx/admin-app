import { Checkbox, Skeleton } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListModalityQuery } from '@/api/modality';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';

type ModalityAutoCompleteFieldsFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const ModalityAutoCompleteFieldsFields = <T extends FieldValues>(
  props: ModalityAutoCompleteFieldsFieldProps<T>,
) => {
  const { control, name } = props;
  const { data: modalityData } = useGetListModalityQuery({
    filter: {},
  });

  const translate = useTranslate();
  return modalityData ? (
    <MyFormAutoComplete
      name={name}
      control={control}
      placeholder={translate.resources.user.modality()}
      enableSelectAll
      MyAutoCompleteProps={{
        size: 'small',
        fullWidth: true,
        options: modalityData.list,
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) => {
          if (typeof option !== 'string') {
            return `${option?.id} - ${option?.name}`;
          }
          return option;
        },
        renderOption: (props, option, state) => {
          return (
            <li {...props}>
              <StyledDivLeftChildren>
                <Checkbox size="small" checked={state.selected} />
                {option?.id}-{option?.name}
              </StyledDivLeftChildren>
            </li>
          );
        },
      }}
    />
  ) : (
    <Skeleton />
  );
};
