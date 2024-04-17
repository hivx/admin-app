import { Checkbox, MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { useGetOneUserQuery, useLazyGetListUsersQuery } from '@/api/users';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { getUserNameWithCode } from '@/dataHelper/radiologyReport/getUserNameWithCode';
import { useTranslate } from '@/hooks';
import { ICloudUserDTO } from '@/types/dto';
import { userToCloudUser } from '@/utils/userToCloudUser';

import { RequestFieldCommonProps } from './RequestFormFields';

/**
 * Trường Bác sĩ kết luận trong form tạo,sửa request
 */
export const RequestApproverSelectField: FC<RequestFieldCommonProps> = ({
  control,
  disabled,
  watch,
}) => {
  const translate = useTranslate();
  const [trigger, { data, isFetching }] = useLazyGetListUsersQuery();
  const users = data?.list ?? [];
  const cloudUsers = users.map(userToCloudUser);

  return (
    <MyFormAutoComplete
      name="finalApprover"
      control={control}
      label={translate.resources.order.concluder()}
      MyAutoCompleteProps={{
        disabled,
        options: cloudUsers,
        onOpen: () =>
          trigger({
            filter: { types: ['IMAGING_DOCTOR'] },
          }),
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
        size: 'extrasmall',
        multiple: false,
        disableCloseOnSelect: false,
      }}
    />
  );
};
