import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListModalityTypeQuery } from '@/api/modalityType';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';

type ContentModalityTypesAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
};

export const ContentModalityTypesAutocompleteField = <T extends FieldValues>(
  props: ContentModalityTypesAutocompleteFieldProps<T>,
) => {
  const { control, name } = props;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { data } = useGetListModalityTypeQuery({
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
        options: modalityTypeList?.map((item) => item.name) || [],
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
