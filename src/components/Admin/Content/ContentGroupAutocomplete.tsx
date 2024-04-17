import { Checkbox, Skeleton } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListContentGroupsQuery } from '@/api/contentGroup';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { IContentGroupDTO } from '@/types/dto';

type ModalityContentGroupAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export const ContentGroupAutocomplete = <T extends FieldValues>(
  props: ModalityContentGroupAutocompleteFieldProps<T>,
) => {
  const { control, name } = props;
  const { data: contentGroupData } = useGetListContentGroupsQuery({
    filter: {},
  });

  const translate = useTranslate();
  return contentGroupData ? (
    <MyFormAutoComplete
      name={name}
      control={control}
      placeholder={translate.resources.content.groupIDs()}
      enableSelectAll
      MyAutoCompleteProps={{
        size: 'small',
        disablePortal: true,
        fullWidth: true,
        options: contentGroupData.list,
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) =>
          `${(option as IContentGroupDTO)?.id} - ${(option as IContentGroupDTO)?.name}`,
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
