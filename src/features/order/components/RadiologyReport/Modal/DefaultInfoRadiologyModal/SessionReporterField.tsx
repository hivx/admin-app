import { MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { useGetOneUserQuery, useLazyGetListUsersQuery } from '@/api/users';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import { getUserNameWithCode } from '@/dataHelper/radiologyReport/getUserNameWithCode';
import { useTranslate } from '@/hooks';

import { SessionConfigFormField } from './DefaultInfoRadiolgyForm';

export type SessionReporterFieldProps = IFormControlInputProps<SessionConfigFormField>;

export const SessionReporterField: FC<SessionReporterFieldProps> = ({
  control,
  formState,
}) => {
  const translate = useTranslate();
  const [trigger] = useLazyGetListUsersQuery();
  const value = formState.defaultValues?.reporterID;
  const { data: user } = useGetOneUserQuery({ id: value ?? 0 }, { skip: !value });

  /**
   * func get list modality by modality type
   */
  const getListReporter = async () => {
    return (
      (
        await trigger(
          {
            filter: { types: ['IMAGING_DOCTOR', 'TECHNICIAN'] },
          },
          true,
        )
      ).data?.list ?? []
    );
  };

  return (
    <>
      <MyLazyFormSelectField
        name="reporterID"
        control={control}
        MySelectProps={{
          label: translate.resources.order.reporter.short(),
          fullWidth: true,
        }}
        disableValue={getUserNameWithCode(user)}
        onGetListRecord={getListReporter}
        renderSelectField={({ listData: userList, formSelectFieldProps }) => (
          <MyFormSelectField {...formSelectFieldProps}>
            <MenuItem key="null" value={0}>
              &nbsp;
            </MenuItem>
            {userList.map((item) => (
              <MenuItem key={item.id} value={item?.id || 0}>
                {getUserNameWithCode(item)}
              </MenuItem>
            ))}
          </MyFormSelectField>
        )}
      />
    </>
  );
};
