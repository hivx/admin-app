import { FormControl, InputLabel, MenuItem, Stack } from '@mui/material';
import { useState } from 'react';

import { useGetListModalityTypeQuery } from '@/api/modalityType';
import { MySelect } from '@/components';
import { useTranslate } from '@/hooks';

import { ConnectedExaminationDefaultConfigForm } from './ExaminationDefaultConfigForm';

export const ExaminationConfigFormWrapper = () => {
  const translate = useTranslate();
  const [modalityType, currentModalityType] = useState<string>('');

  const { data } = useGetListModalityTypeQuery({ filter: {} });
  const modalityTypeList = data?.list ?? [];

  return (
    <Stack spacing={1}>
      <FormControl>
        <InputLabel size="small">
          {translate.resources.order.modalityType.long()}
        </InputLabel>
        <MySelect
          label={translate.resources.procedure.title()}
          size="small"
          placeholder={translate.resources.procedure.title()}
          value={modalityType}
          fullWidth
          onChange={(e) => {
            currentModalityType(e.target.value);
          }}
        >
          <MenuItem key="null" value={''}>
            &nbsp;
          </MenuItem>
          {modalityTypeList.map((item) => (
            <MenuItem key={item.id} value={item?.name || ''}>
              {item.name}
            </MenuItem>
          ))}
        </MySelect>
      </FormControl>
      <ConnectedExaminationDefaultConfigForm
        key={modalityType}
        modalityType={modalityType}
      />
    </Stack>
  );
};
