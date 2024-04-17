import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Stack, styled } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useLazyGetListOrdersQuery } from '@/api/order';
import { MyFormTextField } from '@/components';
import { MyFormGroupUnstyled } from '@/components/Form';
import { MyFormDateTimePicker } from '@/components/Form/MyFormDateTimePicker';
import { useAppDispatch, useTranslate } from '@/hooks';
import {
  ModalitiesByGroupType,
  getGroupFromModalityID,
} from '@/lib/dataHelper/modalityHelper';
import { TABLE_ORDER_MOBILE } from '@/stores/table/tableInitialState';
import { setTableFilter } from '@/stores/table/tableSlice';
import { IGetManyResourcesQuery } from '@/types';
import { IModalityDTO, ISearchOrderFilter } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { ButtonResetFilter } from '../../buttons/ButtonResetFilter';

import { MobileOrderListFilter } from './MobileOrderListFilter';
import { ModalityGroupSelectFields } from './ModalityGroupSelectFields';

type MobileOrderListFilterFormProps = {
  /**
   * default modalityIDs value for order list filter
   */
  modalityIDs: IModalityDTO['id'][];

  modalitiesByGroupData: ModalitiesByGroupType;

  query?: IGetManyResourcesQuery<ISearchOrderFilter>;

  dispatch: ReturnType<typeof useAppDispatch>;
};

/**
 * DEFAULT_VALUES for form reset
 */

const DEFAULT_VALUES: MobileOrderListFilter = {
  patientName: '',
  modalityIDs: [],
  groupModalities: '',
  requestedDateFrom: '',
  requestedDateTo: '',
};

export const MobileOrderListFilterForm: FC<MobileOrderListFilterFormProps> = ({
  modalityIDs,
  modalitiesByGroupData,
  query,
  dispatch,
}) => {
  const translate = useTranslate();
  // const disclosure = useDisclosure();
  const [trigger] = useLazyGetListOrdersQuery();

  const formOptions: UseFormProps<MobileOrderListFilter> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          patientName: z.string().optional(),
          groupModalities: z.string().optional(),
          modalityIDs: z.array(z.number()),
          requestedDateFrom: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
          requestedDateTo: z
            .string()
            .optional()
            .transform(mapNullOrEmptyStringToUndefined),
        })
        .transform((val) => {
          /**
           * Get list modalityID by group
           * if group selected -> get list modalityID by group,
           * else return all modalityID
           */
          const modalityIDsByGroup = val.groupModalities
            ? modalitiesByGroupData
                .get(val.groupModalities)
                ?.map((modality) => modality.id)
            : modalityIDs;

          return {
            ...val,
            modalityIDs: modalityIDsByGroup,
            groupModalities: undefined,
          };
        }),
    ),
    defaultValues: {
      patientName: query?.filter.patientName ?? DEFAULT_VALUES.patientName,
      modalityIDs: query?.filter.modalityIDs ?? DEFAULT_VALUES.modalityIDs,
      requestedDateTo: query?.filter.requestedDateTo ?? DEFAULT_VALUES.requestedDateTo,
      requestedDateFrom:
        query?.filter.requestedDateFrom ?? DEFAULT_VALUES.requestedDateFrom,
      groupModalities:
        getGroupFromModalityID(
          modalitiesByGroupData,
          query?.filter.modalityIDs && query?.filter.modalityIDs,
        ) ?? undefined,
    },
  };

  const handleSubmit = (formData: MobileOrderListFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_ORDER_MOBILE, filter: formData }));

    query && trigger({ ...query, filter: formData });
  };

  return (
    <>
      <MyFormGroupUnstyled
        onSubmit={handleSubmit}
        submitOnEnter
        autoSubmit
        formOptions={formOptions}
        renderInputs={({ control, onKeyDown, reset, setValue, watch, formState }) => (
          <StyledFilterFormWrapper>
            <StyledFilterFieldsWrapper>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <MyFormDateTimePicker
                    name="requestedDateFrom"
                    type="date"
                    watch={watch}
                    label={translate.date.startDate()}
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <MyFormDateTimePicker
                    name="requestedDateTo"
                    type="date"
                    watch={watch}
                    label={translate.date.endDate()}
                    control={control}
                  />
                </Grid>
              </Grid>
              <MyFormTextField
                name="patientName"
                control={control}
                MyTextFieldProps={{
                  label: translate.resources.order.patient.fullname.long(),
                  onKeyDown,
                  size: 'small',
                  title: translate.resources.order.patient.fullname.long(),
                }}
              />
              <ModalityGroupSelectFields
                name="groupModalities"
                modalitiesByGroupData={modalitiesByGroupData}
                control={control}
              />
            </StyledFilterFieldsWrapper>
            <StyledFilterButtonWrapper>
              <ButtonResetFilter onReset={() => reset(DEFAULT_VALUES)} />
              {/* <ButtonAdvanceFilter disclosure={disclosure} /> */}
            </StyledFilterButtonWrapper>
          </StyledFilterFormWrapper>
        )}
      />
    </>
  );
};

const StyledFilterFieldsWrapper = styled(Stack)`
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(1)};
  width: 100%;
`;

const StyledFilterButtonWrapper = styled(Stack)`
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(1)};
  gap: ${(props) => props.theme.spacing(2)};
`;

const StyledFilterFormWrapper = styled('div')`
  display: grid;
  grid-template-columns: 5fr 0.5fr;
`;
