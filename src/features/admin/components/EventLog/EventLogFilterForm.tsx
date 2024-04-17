import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem, Stack } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormDateRangePicker } from '@/components/Form/MyFormDateRangePicker';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_EVENT_LOG } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { useLazyGetListEventLogQuery } from '../../api/eventLog';
import { useLazyGetListEventLogSourceQuery } from '../../api/eventLogSource';
import { EventLogSource, IEventLogDTOSearch } from '../../types';

const DEFAULT_VALUES: IEventLogDTOSearch = {
  source: undefined,
  succeeded: undefined,
  fromDate: '',
  toDate: '',
};

/**
 * Chuyển đổi secceeded : boolean sang giá trị theo số : -1, 1, 2/
 *
 * -1 filter không có Trạng thái gửi,
 * 2 filter theo trạng thái gửi Thất bại
 * 1 filter theo trạng thái gửi Thành công
 *
 */
const getSucceededNumber = (succeeded: IEventLogDTOSearch['succeeded']) => {
  if (typeof succeeded !== 'boolean') {
    return -1;
  } else {
    return succeeded ? 1 : 2;
  }
};

type IEventLogDTOSearchForm = IEventLogDTOSearch & {
  /**
   * Giá trị có thể dùng trong trường select,
   * Thay cho giá trị boolean hoặc undefined của succeeded
   */
  succeededNumber?: number;
};

/**
 * Filter for user activity table
 */
export const EventLogFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetListEventLogQuery();

  const [triggerGetEventLogSource] = useLazyGetListEventLogSourceQuery();
  const query = useAppSelector(getCurrentTableQuery<IEventLogDTOSearch>(TABLE_EVENT_LOG));
  /**
   * func get list user activity type for select field
   */
  const getListEventLogSource = async () => {
    return (await triggerGetEventLogSource({ filter: {} }, true)).data?.list ?? [];
  };

  const formOptions: UseFormProps<IEventLogDTOSearchForm> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          source: z
            .union([z.string(), z.nativeEnum(EventLogSource)])
            .transform(mapNullOrEmptyStringToUndefined)
            .optional(),
          succeeded: z.boolean().optional(),
          succeededNumber: z.number().optional(),
          fromDate: z
            .string()
            .trim()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          toDate: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        })
        .transform((value) => {
          const succeededNumber = value.succeededNumber;
          let succeeded: IEventLogDTOSearch['succeeded'];
          switch (succeededNumber) {
            case -1:
              succeeded = undefined;
              break;
            case 1:
              succeeded = false;
              break;
            case 2:
              succeeded = true;
              break;
          }
          return { ...value, succeededNumber: undefined, succeeded };
        }),
    ),
    defaultValues: {
      fromDate: query?.filter.fromDate ?? '',
      toDate: query?.filter.toDate ?? '',
      source: query?.filter.source ?? undefined,
      succeededNumber: getSucceededNumber(query?.filter.succeeded),
    },
  };

  const handleSubmit = (formData: IEventLogDTOSearch) => {
    dispatch(setTableFilter({ tableId: TABLE_EVENT_LOG, filter: formData }));
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
              name="fakeField"
              control={formControlProps.control}
              handleSubmit={() => undefined}
              handleExpand={open}
              isExpanded={isOpen}
              isFormDirty={formControlProps.formState.isDirty}
              handleReset={() => formControlProps.reset(DEFAULT_VALUES)}
              MyTextFieldProps={{
                placeholder: translate.buttons.search(),
                fullWidth: true,
                onChange: () => undefined,
                value: '',
              }}
            />
          )}
          ExtraFieldsComponent={
            <Stack spacing={1}>
              <MyFormSelectField
                name="succeededNumber"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.eventLog.succeeded(),
                }}
              >
                <MenuItem key="null" value={-1}>
                  &nbsp;
                </MenuItem>
                <MenuItem key={2} value={2}>
                  {translate.messages.notification.success()}
                </MenuItem>
                <MenuItem key={1} value={1}>
                  {translate.messages.notification.failure()}
                </MenuItem>
              </MyFormSelectField>

              <MyLazyFormSelectField
                name="source"
                control={formControlProps.control}
                disableValue={query?.filter.source ?? ''}
                MySelectProps={{
                  label: translate.resources.eventLog.source(),
                }}
                onGetListRecord={getListEventLogSource}
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
              <MyFormDateRangePicker
                nameStart="fromDate"
                nameEnd="toDate"
                label={translate.resources.eventLog.createdTime()}
                formSetValue={formControlProps.setValue}
                watch={formControlProps.watch}
              />
            </Stack>
          }
        />
      )}
    ></TableFooterFormGroup>
  );
};
