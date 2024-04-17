import { Checkbox, Skeleton } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListProcedureQuery } from '@/api/procedure';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { IProcedureDTO } from '@/types/dto';

type ModalityProcedureAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const ContentProcedureAutocomplete = <T extends FieldValues>(
  props: ModalityProcedureAutocompleteFieldProps<T>,
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
        getOptionLabel: (option) =>
          `${(option as IProcedureDTO)?.id} - ${(option as IProcedureDTO)?.name}`,
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
