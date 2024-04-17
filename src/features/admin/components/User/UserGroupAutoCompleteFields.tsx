import { Checkbox, Skeleton } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';

import { useGetListUserGroupQuery } from '../../api/userGroup';

type UserGroupAutoCompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const UserGroupAutoCompleteFields = <T extends FieldValues>(
  props: UserGroupAutoCompleteFieldProps<T>,
) => {
  const { control, name } = props;
  const { data: groupData } = useGetListUserGroupQuery({
    filter: {},
  });

  const translate = useTranslate();
  return groupData ? (
    <MyFormAutoComplete
      name={name}
      control={control}
      placeholder={translate.resources.user.groupIDs()}
      enableSelectAll
      MyAutoCompleteProps={{
        size: 'small',
        fullWidth: true,
        options: groupData.list,
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
