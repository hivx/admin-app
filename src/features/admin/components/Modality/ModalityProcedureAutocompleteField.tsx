import { Checkbox, Skeleton } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListProcedureQuery } from '@/api/procedure';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { IModalityTypeNameDTO, IProcedureDTO } from '@/types/dto';

type ModalityProcedureAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  modalityTypeName?: IModalityTypeNameDTO['id'];
};

export const ModalityProcedureAutocompleteField = <T extends FieldValues>(
  props: ModalityProcedureAutocompleteFieldProps<T>,
) => {
  const { control, name, modalityTypeName } = props;

  const { data: procedureData } = useGetListProcedureQuery({
    filter: { modalityTypes: modalityTypeName ? [modalityTypeName] : undefined },
  });

  const translate = useTranslate();
  return procedureData ? (
    <MyFormAutoComplete
      name={name}
      control={control}
      placeholder={translate.resources.modality.addProcedure()}
      enableSelectAll
      MyAutoCompleteProps={{
        size: 'small',
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
