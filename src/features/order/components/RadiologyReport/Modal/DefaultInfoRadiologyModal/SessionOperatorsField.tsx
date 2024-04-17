import { Checkbox } from '@mui/material';
import { FC } from 'react';

import { useGetListUsersQuery } from '@/api/users';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { getUserNameWithCode } from '@/dataHelper/radiologyReport/getUserNameWithCode';
import { useTranslate } from '@/hooks';
import { ICloudUserDTO, USER_TYPE } from '@/types/dto';
import { userToCloudUser } from '@/utils/userToCloudUser';

import { SessionConfigFormField } from './DefaultInfoRadiolgyForm';

type SessionOperatorsFieldType = IFormControlInputProps<SessionConfigFormField>;

export const SessionOperatorsField: FC<SessionOperatorsFieldType> = ({ control }) => {
  const translate = useTranslate();

  const { data, isFetching } = useGetListUsersQuery({
    filter: {
      types: [USER_TYPE.TECHNICIAN, USER_TYPE.NURSING],
      onDuty: true,
    },
  });
  const users = data?.list ?? [];
  const cloudUsers = users.map(userToCloudUser);

  return (
    <MyFormAutoComplete
      name="operators"
      control={control}
      label={
        translate.resources.user.type({ type: USER_TYPE.TECHNICIAN }) +
        '/' +
        translate.resources.user.type({ type: USER_TYPE.NURSING })
      }
      MyAutoCompleteProps={{
        options: cloudUsers,
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) =>
          `${(option as ICloudUserDTO)?.username} - ${
            (option as ICloudUserDTO)?.fullname
          }`,
        fullWidth: true,
        sx: { height: '100%' },
        limitTags: 2,
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
      }}
    />
  );
};
