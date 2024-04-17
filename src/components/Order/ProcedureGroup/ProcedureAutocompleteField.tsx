import { Checkbox } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListProcedureQuery } from '@/api/procedure';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { IProcedureDTO } from '@/types/dto';

type ProcedureAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const ProcedureAutocompleteField = <T extends FieldValues>(
  props: ProcedureAutocompleteFieldProps<T>,
) => {
  const { control, name } = props;
  const { data: procedureData } = useGetListProcedureQuery({
    filter: {},
  });
  const translate = useTranslate();
  return (
    <MyFormAutoComplete
      name={name}
      control={control}
      label={translate.resources.modality.procedures()}
      placeholder={translate.resources.modality.addProcedure()}
      MyAutoCompleteProps={{
        options: procedureData?.list ?? [],
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) =>
          `${(option as IProcedureDTO)?.id} - ${(option as IProcedureDTO)?.name}`,
        fullWidth: true,
        renderOption: (props, option, { selected }) => {
          return (
            <li {...props}>
              <StyledDivLeftChildren>
                <Checkbox size="small" checked={selected} />
                {option?.id}-{option?.name}
              </StyledDivLeftChildren>
            </li>
          );
        },
      }}
    />
  );
};
