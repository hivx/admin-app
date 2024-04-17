import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { useTranslate } from '@/hooks';

import { useGetListBodyPartsQuery } from '../../api/general';

type ProcedureBodyPartAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const ProcedureBodyPartAutocompleteField = <T extends FieldValues>(
  props: ProcedureBodyPartAutocompleteFieldProps<T>,
) => {
  const { control, name } = props;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const translate = useTranslate();

  const { data } = useGetListBodyPartsQuery({
    filter: {},
  });
  const bodyPartList = data?.list;

  return (
    <MyFormAutoComplete
      name={name}
      control={control}
      label={translate.resources.procedure.bodyParts()}
      placeholder={translate.resources.procedure.bodyParts()}
      MyAutoCompleteProps={{
        options: bodyPartList?.map((item) => item.id) || [],
        fullWidth: true,
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
