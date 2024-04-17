import { Checkbox, Skeleton } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListProcedureQuery } from '@/api/procedure';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';

type LayoutProcedureAutoCompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const LayoutProcedureAutoComplete = <T extends FieldValues>(
  props: LayoutProcedureAutoCompleteFieldProps<T>,
) => {
  const { control, name } = props;
  const { data: procedureData } = useGetListProcedureQuery({
    filter: {},
  });

  const translate = useTranslate();
  return procedureData ? (
    <MyFormAutoComplete
      name={name}
      control={control}
      placeholder={translate.resources.content.procedureIDs()}
      enableSelectAll
      MyAutoCompleteProps={{
        size: 'small',
        fullWidth: true,
        disablePortal: true,
        options: procedureData.list,
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
