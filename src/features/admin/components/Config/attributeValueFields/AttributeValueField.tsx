import React, { FC } from 'react';
import { Control, UseFormWatch, FieldPath } from 'react-hook-form';

import { useGetListConfigAttributeQuery } from '@/api/configAttribute';
import { MyFormTextField, MyTextFieldProps } from '@/components';
import { IConfigDTO, IConfigForm } from '@/types/dto';
import { AttributeDataType, IConfigAttributeDTOBase } from '@/types/dto/configAttribute';

import { AttributeValueSelectField } from './AttributeValueSelectField';

export type AttributeValueFieldProps = {
  configData?: IConfigDTO;
  control: Control<IConfigForm>;
  watch: UseFormWatch<IConfigForm>;
  MyTextFieldProps?: MyTextFieldProps;
  name: FieldPath<IConfigForm>;
};

/**
 * Component to switch type of AttributeValueField
 * Use in ConfigFormFields
 */
export const AttributeValueField: FC<AttributeValueFieldProps> = ({
  control,
  MyTextFieldProps,
  watch,
  name,
}) => {
  const attributeID = watch('attributeID');

  const { data } = useGetListConfigAttributeQuery({ filter: {} });
  const listConfigAttribute = data?.list ?? [];
  const type =
    listConfigAttribute.find((configAttribute) => configAttribute.id === attributeID)
      ?.datatype ?? `${AttributeDataType.STRING}`;

  /**
   * Các attribute có datatype = BOOLEAN → đổi input nhập sang dạng select True/False
   */
  const renderAttributeValueField = (type: IConfigAttributeDTOBase['datatype']) => {
    switch (type) {
      case 'BOOLEAN':
        return (
          <AttributeValueSelectField
            name={name}
            control={control}
            MyTextFieldProps={MyTextFieldProps}
          />
        );
      default:
        return (
          <MyFormTextField
            name={name}
            control={control}
            MyTextFieldProps={MyTextFieldProps}
          />
        );
    }
  };

  return <>{renderAttributeValueField(type)}</>;
};
