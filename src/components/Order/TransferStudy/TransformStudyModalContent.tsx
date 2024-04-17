import { FormControl, InputLabel, MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { MySelect } from '@/components';
import { useTranslate } from '@/hooks';
import { BaseEntity } from '@/types';
import { IStoreDTO } from '@/types/dto/store';

type TransformStudyModalContentType = {
  addressID?: BaseEntity['id'];
  stores: IStoreDTO[];
  onChangeTransferAddress: (id: BaseEntity['id']) => void;
};

export const TransformStudyModalContent: FC<TransformStudyModalContentType> = ({
  onChangeTransferAddress,
  stores,
  addressID,
}) => {
  const translate = useTranslate();

  return (
    <FormControl fullWidth>
      <InputLabel id="select-store" size={'small'}>
        {translate.resources.store.transferAddress()}
      </InputLabel>
      <MySelect
        id="select-store"
        size={'small'}
        fullWidth
        label={translate.resources.store.transferAddress()}
        value={addressID ?? ''}
        onChange={(e) => {
          onChangeTransferAddress(
            typeof e.target.value === 'string'
              ? parseInt(e.target.value)
              : e.target.value,
          );
        }}
      >
        {stores.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </MySelect>
    </FormControl>
  );
};
