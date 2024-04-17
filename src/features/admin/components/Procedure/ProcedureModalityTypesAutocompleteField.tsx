import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListModalityTypeNameQuery } from '@/api/modalityTypeName';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';

type ProcedureModalityTypesAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
};

export const ProcedureModalityTypesAutocompleteField = <T extends FieldValues>(
  props: ProcedureModalityTypesAutocompleteFieldProps<T>,
) => {
  const { control, name } = props;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { data } = useGetListModalityTypeNameQuery({
    filter: {},
  });
  const modalityTypeList = data?.list;
  return (
    <MyFormAutoComplete
      name={name}
      control={control}
      label={props.label}
      placeholder={props.placeholder}
      MyAutoCompleteProps={{
        options: modalityTypeList?.map((item) => item.id) || [],
        fullWidth: true,
        disablePortal: true,
        isOptionEqualToValue: (option, value) => option === value,
        getOptionLabel: (option) => option || '',
        renderOption: (props, option, { selected }) => {
          return (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          );
        },
      }}
    />
  );
};
