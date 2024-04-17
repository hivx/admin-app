import { MenuItem, styled } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useGetListConsumableMaterialQuery } from '@/api/consumableMaterial';
import { MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';

type ProcedureConsumableMaterialAutocompleteFieldProps<T extends FieldValues> = {
  materialID: Path<T>;
  quantity: Path<T>;
  control: Control<T>;
};

export const ProcedureConsumableMaterialAutocompleteField = <T extends FieldValues>(
  props: ProcedureConsumableMaterialAutocompleteFieldProps<T>,
) => {
  const { control, materialID, quantity } = props;
  const translate = useTranslate();

  const { data } = useGetListConsumableMaterialQuery({
    filter: {},
  });
  const consumableMaterialList = data?.list;

  return (
    <StyledDiv>
      <MyFormSelectField
        name={materialID}
        control={control}
        MySelectProps={{
          label: translate.resources.consumable.title(),
          placeholder: translate.resources.consumable.materialName(),
          fullWidth: true,
        }}
      >
        {consumableMaterialList &&
          consumableMaterialList?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </MyFormSelectField>
      <MyFormTextField
        control={control}
        name={quantity}
        MyTextFieldProps={{
          label: translate.resources.consumable.quantity(),
          placeholder: translate.resources.consumable.quantity(),
          size: 'small',
          type: 'number',
          inputProps: { min: 0 },
          defaultValue: 0,
        }}
      />
    </StyledDiv>
  );
};

const StyledDiv = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${(props) => props.theme.spacing(1)};
`;
