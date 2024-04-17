import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useLazyGetListOrdersQuery } from '@/api/order';
import { MyFormTextField } from '@/components/Elements';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormDateRangePicker } from '@/components/Form/MyFormDateRangePicker';
import { MyFormFieldWithDefaultSelector } from '@/components/Form/MyFormFieldWithDefaultSelector/MyFormFieldWithDefaultSelector';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchOrderFilter, ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';
import { RenderFormFieldDefinition } from '@/types/form';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import {
  FilterReportStatusAutoCompleteField,
  ReportStatusData,
  getListStatusDataForAutoComplete,
} from './FilterReportStatusAutoCompleteField';
import { OrderListExpandedFields } from './OrderListExpandedFilterForm';
import {
  ApproverData,
  OrderListFilterApproverAutoCompleteField,
} from './OrderListFilterApproverAutoCompleteField';
import {
  OrderListFilterRequestDepartmentAutoCompleteField,
  RequestDepartmentData,
} from './OrderListFilterRequestDepartmentAutoCompleteField';

const defaultFormValues: ISearchOrderFilter = {
  accessionNumber: '',
  approvedDateFrom: '',
  approvedDateTo: '',
  approverID: 0,
  id: '',
  patientName: '',
  pid: '',
  pidSuffix: '',
  reportStatus: undefined,
  requestedDateFrom: undefined,
  requestedDateTo: undefined,
  requestedDepartmentID: 0,
};

export type ISearchOrderFilterForm = ISearchOrderFilter & {
  reportStatusTemp?: ReportStatusData[];
  requestDepartmentIDTemp?: RequestDepartmentData;
  approverIDTemp?: ApproverData;
};

type OrderListFilterFormProps = {
  tableID: string;
};

export const OrderListFilterForm = (props: OrderListFilterFormProps) => {
  const query = useAppSelector(getCurrentTableQuery<ISearchOrderFilter>(props.tableID));
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetListOrdersQuery();

  const formOptions: UseFormProps<ISearchOrderFilterForm> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          accessionNumber: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          approvedDateFrom: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          approvedDateTo: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          approverID: z.preprocess((id) => (id ? id : undefined), z.number().optional()),
          requestedDepartmentID: z.preprocess(
            (id) => (id ? id : undefined),
            z.number().optional(),
          ),
          id: z.string().optional(),
          patientName: z.string().optional().transform(mapNullOrEmptyStringToUndefined),
          pid: z.string().optional().transform(mapNullOrEmptyStringToUndefined),
          pidSuffix: z.string().optional().transform(mapNullOrEmptyStringToUndefined),
          reportStatusTemp: z
            .array(
              z.object({
                id: z.string(),
                status: z.union([z.string(), z.nativeEnum(ORDER_DIAGNOSIS_STEP_STATUS)]),
              }),
            )
            .optional(),
          requestDepartmentIDTemp: z.object({ id: z.number() }).optional(),
          approverIDTemp: z.object({ id: z.number() }).optional(),
          requestedDateFrom: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          requestedDateTo: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
        })
        // replace id with ids and inject modalityIDs from filter
        .transform((val) => {
          return {
            ...val,
            ids: val.id ? [parseInt(val.id)] : undefined,
            reportStatus:
              val.reportStatusTemp && val.reportStatusTemp
                ? val.reportStatusTemp.map((item) => item.status)
                : undefined,
            id: undefined,
            modalityIDs: query?.filter?.modalityIDs,
            requestedDepartmentID:
              val.requestDepartmentIDTemp && val.requestDepartmentIDTemp.id > 0
                ? val.requestDepartmentIDTemp.id
                : undefined,
            approverID:
              val.approverIDTemp && val.approverIDTemp.id > 0
                ? val.approverIDTemp.id
                : undefined,
            approverIDTemp: undefined,
            requestDepartmentIDTemp: undefined,
            reportStatusTemp: undefined,
          };
        }),
    ),
    defaultValues: {
      accessionNumber: query?.filter.accessionNumber ?? defaultFormValues.accessionNumber,
      approvedDateFrom:
        query?.filter.approvedDateFrom ?? defaultFormValues.approvedDateFrom,
      approvedDateTo: query?.filter.approvedDateTo ?? defaultFormValues.approvedDateTo,
      approverID: query?.filter.approverID ?? defaultFormValues.approverID,
      id: defaultFormValues.id,
      patientName: query?.filter.patientName ?? defaultFormValues.patientName,
      pid: query?.filter.pid ?? defaultFormValues.pid,
      pidSuffix: query?.filter.pidSuffix ?? defaultFormValues.pidSuffix,
      reportStatus: query?.filter.reportStatus ?? defaultFormValues.reportStatus,
      requestedDateFrom:
        query?.filter.requestedDateFrom ?? defaultFormValues.requestedDateFrom,
      requestedDateTo: query?.filter.requestedDateTo ?? defaultFormValues.requestedDateTo,
      requestedDepartmentID:
        query?.filter.requestedDepartmentID ?? defaultFormValues.requestedDepartmentID,
      reportStatusTemp: getListStatusDataForAutoComplete(query?.filter.reportStatus),
    },
  };
  const handleSubmit = (formData: ISearchOrderFilterForm) => {
    dispatch(setTableFilter({ tableId: props.tableID, filter: formData }));
    query && trigger({ ...query, filter: formData });
  };

  return (
    <TableFooterFormGroup
      formOptions={formOptions}
      onSubmit={handleSubmit}
      autoSubmit
      submitOnEnter
      renderInputs={({
        control,
        onKeyDown,
        submit,
        formState,
        watch,
        setValue,
        reset,
      }) => {
        const fieldsDef: RenderFormFieldDefinition<ISearchOrderFilterForm> = {
          pidSuffix: {
            label: translate.resources.order.patient.pid.long(),
            Component: (
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
            ),
          },
          patientName: {
            label: translate.resources.order.patient.fullname.long(),
            Component: (
              <MyFormTextField
                name="patientName"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.order.patient.fullname.long(),
                  placeholder: translate.resources.order.patient.fullname.long(),
                  fullWidth: true,
                  onKeyDown,
                }}
              />
            ),
          },
          accessionNumber: {
            label: translate.resources.order.accessionNumber.long(),
            Component: (
              <MyFormTextField
                name="accessionNumber"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.order.accessionNumber.long(),
                  placeholder: translate.resources.order.accessionNumber.long(),
                  fullWidth: true,
                  onKeyDown,
                }}
              />
            ),
          },
          requestDepartmentIDTemp: {
            label: translate.resources.order.requestedDepartment.long(),
            Component: (
              <OrderListFilterRequestDepartmentAutoCompleteField
                name="requestDepartmentIDTemp"
                control={control}
              />
            ),
          },
          requestedDateFrom: {
            label: translate.resources.order.requestedDate.long(),
            Component: (
              <MyFormDateRangePicker
                nameStart="requestedDateFrom"
                nameEnd="requestedDateTo"
                label={translate.resources.order.requestedDate.long()}
                formSetValue={setValue}
                value={{
                  startDate: query?.filter?.requestedDateFrom ?? '',
                  endDate: query?.filter?.requestedDateTo ?? '',
                }}
                watch={watch}
              />
            ),
          },
          approvedDateFrom: {
            label: translate.resources.order.approvedDate.long(),
            Component: (
              <MyFormDateRangePicker
                nameStart="approvedDateFrom"
                nameEnd="approvedDateTo"
                label={translate.resources.order.approvedDate.long()}
                formSetValue={setValue}
                watch={watch}
              />
            ),
          },
          reportStatusTemp: {
            label: translate.resources.order.reportStatus(),
            Component: (
              <FilterReportStatusAutoCompleteField
                reportStatusFromQuery={query?.filter?.reportStatus}
                name="reportStatusTemp"
                control={control}
              />
            ),
          },
          approverIDTemp: {
            label: translate.resources.order.reporter.long(),
            Component: (
              <OrderListFilterApproverAutoCompleteField
                name="approverIDTemp"
                control={control}
              />
            ),
          },
        };
        return (
          <ExpandableFormContainer
            tableID={props.tableID}
            handleSubmit={submit}
            renderPrimaryField={({ open }) => (
              <MyFormFieldWithDefaultSelector
                tableID={props.tableID}
                fieldsDef={fieldsDef}
                handleExpand={open}
                isFormDirty={formState.isDirty}
                resetFormOnDirty={false}
                handleReset={() => reset(defaultFormValues)}
              />
            )}
            ExtraFieldsComponent={<OrderListExpandedFields fieldsDef={fieldsDef} />}
          />
        );
      }}
    ></TableFooterFormGroup>
  );
};
