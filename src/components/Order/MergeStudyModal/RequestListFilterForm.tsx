/* eslint-disable no-console */
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useLazyGetListOrdersQuery } from '@/api/order';
import { MyFormTextField } from '@/components';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormDateRangePicker } from '@/components/Form/MyFormDateRangePicker';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { convertPatientName } from '@/dataHelper/convertPatientName';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_ORDER_MERGE_STUDY } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { IGetManyResourcesQuery } from '@/types';
import { ISearchOrderFilter } from '@/types/dto';
import { formatDate, getCurrentDate } from '@/utils/dateUtils';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

const EMPTY_VALUES: ISearchOrderFilter = {
  patientName: '',
  pidSuffix: '',
  requestedDateFrom: '',
  requestedDateTo: '',
};
type RequestListFilterFormProps = {
  query: IGetManyResourcesQuery<Partial<ISearchOrderFilter>>;
};
export const ConnectedRequestListFilterForm: FC = () => {
  const query = useAppSelector(
    getCurrentTableQuery<ISearchOrderFilter>(TABLE_ORDER_MERGE_STUDY),
  );

  return query ? (
    <RequestListFilterForm query={query} key={query.filter.patientName} />
  ) : (
    <></>
  );
};
export const RequestListFilterForm: FC<RequestListFilterFormProps> = (props) => {
  const { query } = props;
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const formOptions: UseFormProps<ISearchOrderFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        patientName: z
          .string()
          .trim()
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
        pidSuffix: z
          .union([z.number(), z.string()])
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
        requestedDateFrom: z
          .string()
          .trim()
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
        requestedDateTo: z
          .string()
          .trim()
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
      }),
    ),
    defaultValues: {
      patientName:
        convertPatientName(query.filter.patientName) ?? EMPTY_VALUES.patientName,
      pidSuffix: query.filter.pidSuffix ?? EMPTY_VALUES.pidSuffix,
      requestedDateFrom: query.filter.requestedDateFrom ?? formatDate(getCurrentDate()),
      requestedDateTo: query.filter.requestedDateTo ?? formatDate(getCurrentDate()),
      modalityType: query.filter.modalityType ?? EMPTY_VALUES.modalityType,
    },
  };
  const handleSubmit = (formData: ISearchOrderFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_ORDER_MERGE_STUDY, filter: formData }));
  };

  return (
    <TableFooterFormGroup
      formOptions={formOptions}
      onSubmit={handleSubmit}
      submitOnEnter
      renderInputs={({
        control,
        formState,
        onKeyDown,
        submit,
        reset,
        watch,
        setValue,
      }) => (
        <ExpandableFormContainer
          tableID={TABLE_ORDER_MERGE_STUDY}
          handleSubmit={submit}
          renderPrimaryField={({ open, isOpen }) => (
            <MyFormPrimaryFilterField
              name="patientName"
              control={control}
              handleSubmit={submit}
              handleExpand={open}
              isExpanded={isOpen}
              isFormDirty={formState.isDirty}
              handleReset={() => reset(EMPTY_VALUES)}
              MyTextFieldProps={{
                placeholder: translate.resources.patient.fullName(),
                fullWidth: true,
                onKeyDown,
              }}
            />
          )}
          ExtraFieldsComponent={
            <>
              <MyFormTextField
                name="pidSuffix"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.order.patient.pid.long(),
                  placeholder: translate.resources.order.patient.pid.long(),
                  fullWidth: true,
                  onKeyDown,
                }}
              />
              <MyFormDateRangePicker
                nameStart="requestedDateFrom"
                nameEnd="requestedDateTo"
                label={translate.resources.order.requestedDate.long()}
                formSetValue={setValue}
                watch={watch}
              />
            </>
          }
        />
      )}
    ></TableFooterFormGroup>
  );
};
