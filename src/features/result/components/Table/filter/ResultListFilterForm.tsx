import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useLazyGetListOrdersQuery } from '@/api/order';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import {
  ReportStatusData,
  getListStatusDataForAutoComplete,
} from '@/components/Order/Filter/FilterReportStatusAutoCompleteField';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_RESULT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchOrderFilter, ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { ResultListExpandedFilterForm } from './ResultListExpandedFilterForm';

const emptyFormValues: ISearchOrderFilter = {
  accessionNumber: '',
  referringPhysicianID: 0,
  id: '',
  patientName: '',
  pid: '',
  pidSuffix: '',
  reportStatus: undefined,
  requestedDateFrom: undefined,
  requestedDateTo: undefined,
  requestedDepartmentID: 0,
};

type ResultListFilterFormType = ISearchOrderFilter & {
  reportStatusTemp?: ReportStatusData[];
};

export const ResultListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const query = useAppSelector(
    getCurrentTableQuery<ResultListFilterFormType>(TABLE_RESULT),
  );
  const [trigger] = useLazyGetListOrdersQuery();

  const formOptions: UseFormProps<ResultListFilterFormType> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          accessionNumber: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          // approvedDateFrom: z
          //   .string()
          //   .optional()
          //   .transform(mapNullOrEmptyStringToUndefined),
          // approvedDateTo: z
          //   .string()
          //   .optional()
          //   .transform(mapNullOrEmptyStringToUndefined),
          referringPhysicianID: z.preprocess(
            (id) => (id ? id : undefined),
            z.number().optional(),
          ),
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
          requestedDateFrom: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          requestedDateTo: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          modalityType: z.string().optional().transform(mapNullOrEmptyStringToUndefined),
        })
        // replace id with ids and inject modalityIDs from filter
        .transform((val) => ({
          ...val,
          ids: val.id ? [parseInt(val.id)] : undefined,
          reportStatus:
            val.reportStatusTemp && val.reportStatusTemp
              ? val.reportStatusTemp.map((item) => item.status)
              : undefined,
          id: undefined,
          modalityIDs: query?.filter?.modalityIDs,
          reportStatusTemp: undefined,
        })),
    ),
    defaultValues: {
      accessionNumber: query?.filter.accessionNumber ?? emptyFormValues.accessionNumber,
      approverID: query?.filter.approverID ?? emptyFormValues.approverID,
      id: emptyFormValues.id,
      patientName: query?.filter.patientName ?? emptyFormValues.patientName,
      pid: query?.filter.pid ?? emptyFormValues.pid,
      pidSuffix: query?.filter.pidSuffix ?? emptyFormValues.pidSuffix,
      reportStatus: query?.filter.reportStatus ?? emptyFormValues.reportStatus,
      requestedDateFrom:
        query?.filter.requestedDateFrom ?? emptyFormValues.requestedDateFrom,
      requestedDateTo: query?.filter.requestedDateTo ?? emptyFormValues.requestedDateTo,
      requestedDepartmentID:
        query?.filter.requestedDepartmentID ?? emptyFormValues.requestedDepartmentID,
      reportStatusTemp: getListStatusDataForAutoComplete(query?.filter.reportStatus),
    },
  };
  const handleSubmit = (formData: ISearchOrderFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_RESULT, filter: formData }));
    query && trigger({ ...query, filter: formData });
  };

  return (
    <TableFooterFormGroup
      formOptions={formOptions}
      onSubmit={handleSubmit}
      autoSubmit
      submitOnEnter
      renderInputs={(formControlProps) => (
        <ExpandableFormContainer
          tableID={TABLE_RESULT}
          handleSubmit={formControlProps.submit}
          renderPrimaryField={(props) => (
            <MyFormPrimaryFilterField
              name="patientName"
              control={formControlProps.control}
              handleSubmit={formControlProps.submit}
              handleExpand={props.open}
              isExpanded={props.isOpen}
              isFormDirty={formControlProps.formState.isDirty}
              resetFormOnDirty={false}
              handleReset={() => formControlProps.reset(emptyFormValues)}
              MyTextFieldProps={{
                placeholder: translate.resources.order.patient.fullname.long(),
                fullWidth: true,
                onKeyDown: formControlProps.onKeyDown,
              }}
            />
          )}
          ExtraFieldsComponent={
            <ResultListExpandedFilterForm formControlProps={formControlProps} />
          }
        />
      )}
    ></TableFooterFormGroup>
  );
};
