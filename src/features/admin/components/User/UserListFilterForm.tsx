import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetListDepartmentsQuery } from '@/api/departments';
import { useLazyGetListUsersQuery } from '@/api/users';
import { useGetListUserTypeQuery } from '@/api/userType';
import { MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_USER } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchUserFilter } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { useGetListUserGroupQuery } from '../../api/userGroup';

const DEFAULT_VALUES: ISearchUserFilter = {
  code: '',
  departmentID: undefined,
  fullname: '',
  types: undefined,
  groupIDs: undefined,
};

export const UserListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const { data: departmentData } = useGetListDepartmentsQuery({
    filter: {},
  });

  const departments = departmentData?.list;

  const { data: userGroupData } = useGetListUserGroupQuery({
    filter: {},
  });

  const userGroups = userGroupData?.list;

  const { data: userTypeData } = useGetListUserTypeQuery({
    filter: {},
  });
  const userTypes = userTypeData?.list;

  const [trigger] = useLazyGetListUsersQuery();
  const query = useAppSelector(getCurrentTableQuery<ISearchUserFilter>(TABLE_USER));

  const formOptions: UseFormProps<ISearchUserFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          fullname: z
            .string()
            .trim()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          code: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
          groupIDs: z
            .union([z.number(), z.string()])
            .transform((value) => (value ? [value] : undefined))
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          departmentID: z
            .union([z.number(), z.string()])
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          type: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
          types: z.array(z.string()).optional(),
        })
        .transform((val) => {
          return { ...val, types: val.type ? [val.type] : undefined, type: undefined };
        }),
    ),
    defaultValues: {
      code: query?.filter.code ?? '',
      departmentID: query?.filter.departmentID ?? undefined,
      fullname: query?.filter.fullname ?? '',
      types: query?.filter.types ?? undefined,
      groupIDs: query?.filter.groupIDs ?? undefined,
    },
  };
  const handleSubmit = (formData: ISearchUserFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_USER, filter: formData }));
    trigger({ ...query, filter: formData });
  };

  return (
    <TableFooterFormGroup
      formOptions={formOptions}
      onSubmit={handleSubmit}
      autoSubmit
      submitOnEnter
      renderInputs={(formControlProps) => (
        <ExpandableFormContainer
          handleSubmit={formControlProps.submit}
          renderPrimaryField={({ open, isOpen }) => (
            <MyFormPrimaryFilterField
              name="fullname"
              control={formControlProps.control}
              handleSubmit={formControlProps.submit}
              handleExpand={open}
              isExpanded={isOpen}
              isFormDirty={formControlProps.formState.isDirty}
              resetFormOnDirty={false}
              handleReset={() => formControlProps.reset(DEFAULT_VALUES)}
              MyTextFieldProps={{
                placeholder: translate.resources.user.name(),
                fullWidth: true,
                onKeyDown: formControlProps.onKeyDown,
              }}
            />
          )}
          ExtraFieldsComponent={
            <>
              <MyFormTextField
                name="code"
                control={formControlProps.control}
                MyTextFieldProps={{
                  label: translate.resources.user.code(),
                  placeholder: translate.resources.user.code(),
                  fullWidth: true,
                  onKeyDown: formControlProps.onKeyDown,
                }}
              />

              <MyFormSelectField
                name="departmentID"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.user.department(),
                }}
              >
                <MenuItem key="null" value={''}>
                  &nbsp;
                </MenuItem>
                {departments &&
                  departments.map((item) => (
                    <MenuItem key={item.id} value={item.id || ''}>
                      {item.name}
                    </MenuItem>
                  ))}
              </MyFormSelectField>

              <MyFormSelectField
                name="groupIDs"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.user.groupIDs(),
                }}
              >
                <MenuItem key="null" value={''}>
                  &nbsp;
                </MenuItem>
                {userGroups &&
                  userGroups.map((item) => (
                    <MenuItem key={item.id} value={item.id || ''}>
                      {item.name}
                    </MenuItem>
                  ))}
              </MyFormSelectField>

              <MyFormSelectField
                name="type"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.user.userType(),
                }}
              >
                <MenuItem key="null" value={''}>
                  &nbsp;
                </MenuItem>
                {userTypes &&
                  userTypes.map((item) => (
                    <MenuItem key={item.id} value={item.name || ''}>
                      {item.name}
                    </MenuItem>
                  ))}
              </MyFormSelectField>
            </>
          }
        />
      )}
    ></TableFooterFormGroup>
  );
};
