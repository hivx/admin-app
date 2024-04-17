import { MenuItem, styled } from '@mui/material';
import { FC, useEffect } from 'react';

import { useLazyGetListModalityTypeQuery } from '@/api/modalityType';
import { useLazyGetListUsersQuery } from '@/api/users';
import { MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormDateRangePicker } from '@/components/Form/MyFormDateRangePicker';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { FilterReportStatusAutoCompleteField } from '@/components/Order/Filter/FilterReportStatusAutoCompleteField';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_RESULT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import {
  ICloudUserDTO,
  IModalityTypeDTO,
  ISearchOrderFilter,
  USER_TYPE,
} from '@/types/dto';

type ResultListExpandedFilterFormProps = {
  formControlProps: IFormControlInputProps<ISearchOrderFilter>;
};

/**
 * Handles lazy loading of form data
 */
export const ResultListExpandedFilterForm: FC<ResultListExpandedFilterFormProps> = (
  props,
) => {
  const [triggerSearchUser, { data: userData }] = useLazyGetListUsersQuery();
  const [triggerSearchModalityType, { data: modalityTypeData }] =
    useLazyGetListModalityTypeQuery();
  useEffect(() => {
    /**
     * Lazy query but prefer cache value
     */
    triggerSearchUser({ filter: { types: [USER_TYPE.REFER_DOCTOR] } }, true);
    triggerSearchModalityType({ filter: {} }, true);
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (userData && modalityTypeData)
    return (
      <OrderListExpandedFields
        formControlProps={props.formControlProps}
        doctors={userData.list}
        modalityTypes={modalityTypeData.list}
      />
    );
  return <FullPageSpinner />;
};

type OrderListExpandedFieldsProps = {
  modalityTypes: IModalityTypeDTO[];
  doctors: ICloudUserDTO[];
  formControlProps: ResultListExpandedFilterFormProps['formControlProps'];
};

const OrderListExpandedFields: FC<OrderListExpandedFieldsProps> = (props) => {
  const { doctors, formControlProps, modalityTypes } = props;
  const query = useAppSelector(getCurrentTableQuery<ISearchOrderFilter>(TABLE_RESULT));
  const { control, setValue, watch, onKeyDown } = formControlProps;
  const translate = useTranslate();

  return (
    <StyledResultListExpandedFilterFormContainer>
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
      <MyFormDateRangePicker
        nameStart="requestedDateFrom"
        nameEnd="requestedDateTo"
        label={translate.resources.order.requestedDate.long()}
        formSetValue={setValue}
        watch={watch}
      />
      <MyFormSelectField
        name="referringPhysicianID" // this is BS Chỉ định, API doesnt have yet
        control={control}
        MySelectProps={{
          label: translate.resources.order.referringPhysician.long(),
        }}
      >
        <MenuItem key="null" value={''}>
          &nbsp;
        </MenuItem>
        {doctors.map((item) => (
          <MenuItem key={item.id} value={item.id || ''}>
            {item.fullname}
          </MenuItem>
        ))}
      </MyFormSelectField>
      <FilterReportStatusAutoCompleteField
        reportStatusFromQuery={query?.filter.reportStatus}
        name="reportStatusTemp"
        control={control}
      />

      <MyFormSelectField
        name="modalityType"
        control={control}
        MySelectProps={{
          label: translate.resources.order.deviceType.long(),
        }}
      >
        <MenuItem key="null" value={''}>
          &nbsp;
        </MenuItem>
        {modalityTypes.map((item) => {
          return (
            <MenuItem key={item.id} value={item.name || ''}>
              {item.name}
            </MenuItem>
          );
        })}
      </MyFormSelectField>
    </StyledResultListExpandedFilterFormContainer>
  );
};

/**
 * Styles
 */
const StyledResultListExpandedFilterFormContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing(3)};
`;
