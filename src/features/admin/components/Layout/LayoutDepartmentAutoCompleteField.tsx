import { Checkbox, Skeleton } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListDepartmentsQuery } from '@/api/departments';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';

type LayoutDepartmentAutoCompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const LayoutDepartmentAutoCompleteField = <T extends FieldValues>(
  props: LayoutDepartmentAutoCompleteFieldProps<T>,
) => {
  const { control, name } = props;
  const { data: departmentData } = useGetListDepartmentsQuery({
    filter: {},
  });

  const translate = useTranslate();
  return departmentData ? (
    <MyFormAutoComplete
      name={name}
      control={control}
      placeholder={translate.resources.layout.department()}
      enableSelectAll
      MyAutoCompleteProps={{
        size: 'small',
        fullWidth: true,
        disablePortal: true,
        options: departmentData.list,
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
