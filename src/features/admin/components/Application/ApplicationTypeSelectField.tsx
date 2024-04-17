import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { useLazyGetListApplicationTypesQuery } from '@/api/applicationType';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';

import { IApplicationFormFields } from './ApplicationFormFields';

type ApplicationTypeSelectFieldProps = {
  control: Control<IApplicationFormFields>;
  disabled?: boolean;
  required?: boolean;
  watch: UseFormWatch<IApplicationFormFields>;
};

/**
 * Component to select ApplicationType
 */
export const ApplicationTypeSelectField: FC<ApplicationTypeSelectFieldProps> = ({
  control,
  watch,
  disabled = false,
  required = false,
}) => {
  const translate = useTranslate();
  const attributeID = watch('type');
  const [trigger] = useLazyGetListApplicationTypesQuery();

  const getListApplicationType = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };

  return (
    <MyLazyFormSelectField
      name="type"
      control={control}
      required={required}
      MySelectProps={{
        label: translate.resources.application.type(),
        disabled: disabled,
      }}
      disableValue={attributeID}
      onGetListRecord={getListApplicationType}
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
