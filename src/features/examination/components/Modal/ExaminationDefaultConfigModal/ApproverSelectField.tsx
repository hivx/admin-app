import { Checkbox, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control, useWatch } from 'react-hook-form';

import { useGetListUsersQuery, useLazyGetListUsersQuery } from '@/api/users';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { getUserNameWithCode } from '@/dataHelper/radiologyReport/getUserNameWithCode';
import { useTranslate } from '@/hooks';
import { ICloudUserDTO } from '@/types/dto';
import { userToCloudUser } from '@/utils/userToCloudUser';

import { ExaminationDefaultConfigField } from './ExaminationDefaultConfigForm';

export type ReporterSelectFieldProps = {
  control: Control<ExaminationDefaultConfigField>;
};

export const ApproverSelectField: FC<ReporterSelectFieldProps> = ({ control }) => {
  const translate = useTranslate();
  const { data, isFetching } = useGetListUsersQuery({
    filter: { types: ['IMAGING_DOCTOR'] },
  });
  const users = data?.list ?? [];
  const cloudUsers = users.map(userToCloudUser);

  return (
    <MyFormAutoComplete
      name="approver"
      control={control}
      label={translate.resources.order.concluder()}
      MyAutoCompleteProps={{
        options: cloudUsers,
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) =>
          `${option ? getUserNameWithCode(option as ICloudUserDTO) : ''}`,
        fullWidth: true,
        sx: { height: '100%' },
        limitTags: 1,
        renderOption: (props, option, { selected }) => {
          return (
            <li {...props}>
              <StyledDivLeftChildren>
                <Checkbox size="small" checked={selected} />
                {getUserNameWithCode(option)}
              </StyledDivLeftChildren>
            </li>
          );
        },
        size: 'small',
        multiple: false,
        disableCloseOnSelect: false,
      }}
    />
  );
};
