import { Checkbox } from '@mui/material';
import React, { useEffect } from 'react';
import {
  FieldValues,
  Path,
  Control,
  UseFormWatch,
  useWatch,
  UseFormSetValue,
} from 'react-hook-form';

import { useLazyGetListTimetableQuery } from '@/api/timeTable';
import { useGetListTimetablePeriodQuery } from '@/api/timetablePeriod';
import { useGetListUsersQuery } from '@/api/users';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { IUserDTO } from '@/types/dto';
import { ITimeTableUpdateDTO } from '@/types/dto/timeTable';

import { UpdateTimetableFieldsType } from './UpdateTimetableForm';

type UsersAutoCompleteFieldProps = {
  control: Control<UpdateTimetableFieldsType>;
  watch: UseFormWatch<UpdateTimetableFieldsType>;
  setValue: UseFormSetValue<UpdateTimetableFieldsType>;
};

export const UsersAutoCompleteField = (props: UsersAutoCompleteFieldProps) => {
  const translate = useTranslate();
  const { control, setValue } = props;
  const [triggerGetListTimeTable] = useLazyGetListTimetableQuery();

  const { userType, user, fromDate, toDate } = useWatch({ control });
  const { data: userData } = useGetListUsersQuery(
    {
      filter: { types: userType ? [userType] : [] },
    },
    { skip: !userType },
  );
  useEffect(() => {
    const getTimeTableByID = async () => {
      if (user?.id) {
        const { list: userTimeTable } = await triggerGetListTimeTable({
          filter: {
            fromDate,
            toDate,
            userIDs: user?.id ? [user.id] : [],
          },
        }).unwrap();

        const periodData: ITimeTableUpdateDTO['period'] = { 1: [], 2: [], 3: [] };

        userTimeTable.forEach((item) => {
          if (item.timetable) {
            Object.keys(item.timetable).forEach((periodID) => {
              periodData[parseInt(periodID)] = [
                ...periodData[parseInt(periodID)],
                item.id,
              ];
            });
          }
        });
        setValue('period', periodData);
      }
    };
    getTimeTableByID();
  }, [fromDate, setValue, toDate, triggerGetListTimeTable, user?.id]);

  return (
    <MyFormAutoComplete
      name="user"
      control={control}
      label={translate.resources.analytics.approverNameTitle()}
      placeholder={translate.resources.analytics.approverNameTitle()}
      MyAutoCompleteProps={{
        options: userData?.list.filter((item) => item.enabled) ?? [],
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) =>
          `${(option as IUserDTO)?.id} - ${(option as IUserDTO)?.fullname}`,
        fullWidth: true,
        renderOption: (props, option, { selected }) => {
          return (
            <li {...props}>
              <StyledDivLeftChildren>
                <Checkbox size="small" checked={selected} />
                {option?.id}-{option?.fullname}
              </StyledDivLeftChildren>
            </li>
          );
        },
        multiple: false,
        disableCloseOnSelect: false,
      }}
    />
  );
};
