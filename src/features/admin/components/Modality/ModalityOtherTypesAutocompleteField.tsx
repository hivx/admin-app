import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { useTranslate } from '@/hooks';
import { IModalityTypeDTO } from '@/types/dto';

type ModalityOtherTypesAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  otherModalityTypes: IModalityTypeDTO[];
};

export const ModalityOtherTypesAutocompleteField = <T extends FieldValues>(
  props: ModalityOtherTypesAutocompleteFieldProps<T>,
) => {
  const { control, name, otherModalityTypes } = props;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const translate = useTranslate();
  return (
    <MyFormAutoComplete
      name={name}
      control={control}
      label={translate.resources.modality.otherModalityTypes()}
      placeholder={translate.resources.modality.addModalityType()}
      MyAutoCompleteProps={{
        options: otherModalityTypes || [],
        fullWidth: true,
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) => `${(option as IModalityTypeDTO).name}`,
        renderOption: (props, option, { selected }) => {
          return (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          );
        },
      }}
    />
  );
};
