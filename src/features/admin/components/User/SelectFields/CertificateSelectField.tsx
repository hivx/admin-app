import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';

import { useLazyGetListCertificateQuery } from '../../../api/certificate';
import { UserFormFields } from '../UserFormFields';

type CertificateSelectFieldProps = {
  disableValue: string;
  control: Control<UserFormFields>;
  watch: UseFormWatch<UserFormFields>;
};

export const CertificateSelectField: FC<CertificateSelectFieldProps> = ({
  control,
  watch,
  disableValue,
}) => {
  const translate = useTranslate();
  const [trigger] = useLazyGetListCertificateQuery();
  const getListCertificate = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };
  return (
    <MyLazyFormSelectField
      name="certificateID"
      control={control}
      MySelectProps={{
        label: translate.resources.user.certificate(),
      }}
      disableValue={disableValue}
      onGetListRecord={getListCertificate}
      renderSelectField={({ listData: certificateList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          {certificateList.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
    />
  );
};
