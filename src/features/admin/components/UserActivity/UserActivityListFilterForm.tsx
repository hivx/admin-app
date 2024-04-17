import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem, Stack } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_USER_ACTIVITY } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchUserActivityFilter, UserActivityType } from '@/types/dto/userActivity';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { useLazyGetListUserActivityQuery } from '../../api/userActivity';
import { useLazyGetListUserActivityTypeQuery } from '../../api/userActivityType';

const DEFAULT_VALUES: ISearchUserActivityFilter = {
  fullname: '',
  type: undefined,
  username: '',
};

/**
 * Filter for user activity table
 */
export const UserActivityListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetListUserActivityQuery();
  const [triggerGetActivityType] = useLazyGetListUserActivityTypeQuery();
  const query = useAppSelector(
    getCurrentTableQuery<ISearchUserActivityFilter>(TABLE_USER_ACTIVITY),
  );
  /**
   * func get list user activity type for select field
   */
  const getListUserActivityType = async () => {
    return (await triggerGetActivityType({ filter: {} }, true)).data?.list ?? [];
  };

  const formOptions: UseFormProps<ISearchUserActivityFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        fullname: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        username: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        type: z
          .union([z.string(), z.nativeEnum(UserActivityType)])
          .transform(mapNullOrEmptyStringToUndefined),
      }),
    ),
    defaultValues: {
      fullname: query?.filter.fullname ?? '',
      username: query?.filter.username ?? '',
      type: query?.filter.type ?? undefined,
    },
  };
  const handleSubmit = (formData: ISearchUserActivityFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_USER_ACTIVITY, filter: formData }));
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
              handleReset={() => formControlProps.reset(DEFAULT_VALUES)}
              MyTextFieldProps={{
                placeholder: translate.resources.userActivity.fullname(),
                fullWidth: true,
                onKeyDown: formControlProps.onKeyDown,
              }}
            />
          )}
          ExtraFieldsComponent={
            <Stack spacing={1}>
              <MyFormTextField
                name="username"
                control={formControlProps.control}
                MyTextFieldProps={{
                  label: translate.resources.userActivity.username(),
                  placeholder: translate.resources.userActivity.username(),
                  fullWidth: true,
                  onKeyDown: formControlProps.onKeyDown,
                }}
              />
              <MyLazyFormSelectField
                name="type"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.userActivity.type(),
                }}
                disableValue={query?.filter.type}
                onGetListRecord={getListUserActivityType}
                renderSelectField={({
                  listData: modalityTypeList,
                  formSelectFieldProps,
                }) => (
                  <MyFormSelectField {...formSelectFieldProps}>
                    <MenuItem key="null" value={''}>
                      &nbsp;
                    </MenuItem>
                    {modalityTypeList.map((item) => (
                      <MenuItem key={item.id} value={item?.name || ''}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </MyFormSelectField>
                )}
              />
            </Stack>
          }
        />
      )}
    ></TableFooterFormGroup>
  );
};
