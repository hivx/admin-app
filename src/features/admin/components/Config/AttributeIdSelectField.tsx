import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { useLazyGetListConfigAttributeQuery } from '@/api/configAttribute';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';
import { IConfigForm } from '@/types/dto';

type AttributeIdSelectFieldProps = {
  control: Control<IConfigForm>;
  disabled?: boolean;
  required?: boolean;
  watch: UseFormWatch<IConfigForm>;
};

/**
 * Component to select AttributeID
 */
export const AttributeIdSelectField: FC<AttributeIdSelectFieldProps> = ({
  control,
  watch,
  disabled = false,
  required = false,
}) => {
  const translate = useTranslate();
  const attributeID = watch('attributeID');
  const [trigger] = useLazyGetListConfigAttributeQuery();

  const getListConfigAttribute = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };

  return (
    <MyLazyFormSelectField
      name="attributeID"
      control={control}
      required={required}
      MySelectProps={{
        label: translate.resources.config.attribute(),
        disabled: disabled,
      }}
      disableValue={attributeID}
      onGetListRecord={getListConfigAttribute}
      renderSelectField={({ listData: modalityTypeList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          {modalityTypeList.map((item) => (
            <MenuItem key={item.id} value={item?.id || ''}>
              {item.id}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
    />
  );
};
