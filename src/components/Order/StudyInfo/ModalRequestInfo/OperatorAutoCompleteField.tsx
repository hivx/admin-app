import { Checkbox } from '@mui/material';
import React, { FC } from 'react';

import { useLazyGetListUsersQuery } from '@/api/users';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { ICloudUserDTO, USER_TYPE } from '@/types/dto';
import { userToCloudUser } from '@/utils/userToCloudUser';

import { RequestFieldCommonProps } from './RequestFormFields';

export const OperatorAutoCompleteField: FC<RequestFieldCommonProps> = ({
  control,
  disabled,
}) => {
  const translate = useTranslate();

  const [trigger, { data, isFetching }] = useLazyGetListUsersQuery();
  const users = data?.list ?? [];
  const cloudUsers = users.map(userToCloudUser);

  return (
    <MyFormAutoComplete
      name="operators"
      control={control}
      label={`${translate.resources.user.type({ type: USER_TYPE.TECHNICIAN })} /
        ${translate.resources.user.type({ type: USER_TYPE.NURSING })}`}
      MyAutoCompleteProps={{
        disabled,
        options: cloudUsers,
        onOpen: () =>
          trigger({
            filter: { types: [USER_TYPE.TECHNICIAN, USER_TYPE.NURSING] },
          }),
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) =>
          `${(option as ICloudUserDTO)?.username} - ${
            (option as ICloudUserDTO)?.fullname
          }`,
        fullWidth: true,
        sx: { height: '100%' },
        limitTags: 1,
        renderOption: (props, option, { selected }) => {
          return (
            <li {...props}>
              <StyledDivLeftChildren>
                <Checkbox size="small" checked={selected} />
                {`${option?.username} - ${option?.fullname}`}
              </StyledDivLeftChildren>
            </li>
          );
        },
        size: 'extrasmall',
      }}
    />
  );
};
