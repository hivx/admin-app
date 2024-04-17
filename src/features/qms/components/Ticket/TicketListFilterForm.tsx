import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem, styled } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyFormGroupUnstyled } from '@/components/Form';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_TICKET } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { useLazyGetListTicketQuery } from '../../api/ticket';
import { ISearchTicketFilter, TICKET_STEP_STATUS } from '../../types/ticket';

export const ticketStatusWithLabel: Record<TICKET_STEP_STATUS, { label: string }> = {
  STARTED: { label: 'Chưa chụp' },
  PASSING: { label: 'Qua lượt' },
  COMPLETED: { label: 'Hoàn thành' },
};

export const DEFAULT_VALUES: Partial<ISearchTicketFilter> = {
  pid: '',
  patientName: '',
  status: TICKET_STEP_STATUS.STARTED,
};
export const TicketListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const query = useAppSelector(getCurrentTableQuery<ISearchTicketFilter>(TABLE_TICKET));

  const [trigger] = useLazyGetListTicketQuery();
  const formOptions: UseFormProps<ISearchTicketFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        pid: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        patientName: z
          .string()
          .trim()
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
        status: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
      }),
    ),
    defaultValues: {
      status: query?.filter.status ?? DEFAULT_VALUES.status,
    },
  };
  const handleSubmit = (formData: ISearchTicketFilter) => {
    dispatch(
      setTableFilter({
        tableId: TABLE_TICKET,
        filter: { ...query?.filter, ...formData },
      }),
    );
    trigger({ ...query, filter: { ...query?.filter, ...formData } });
  };

  return (
    <StyledFilterFormWrapper>
      <MyFormGroupUnstyled
        formOptions={formOptions}
        onSubmit={handleSubmit}
        submitOnEnter
        renderInputs={({ control, formState, onKeyDown, submit, reset }) => (
          <ExpandableFormContainer
            handleSubmit={submit}
            renderPrimaryField={({ open, isOpen }) => (
              <MyFormPrimaryFilterField
                name="patientName"
                control={control}
                handleSubmit={submit}
                handleExpand={open}
                isExpanded={isOpen}
                isFormDirty={formState.isDirty}
                handleReset={() => reset(DEFAULT_VALUES)}
                MyTextFieldProps={{
                  placeholder: 'Tên bệnh nhân',
                  fullWidth: true,
                  onKeyDown,
                }}
              />
            )}
            ExtraFieldsComponent={
              <>
                <MyFormTextField
                  name="pid"
                  control={control}
                  MyTextFieldProps={{
                    label: 'Mã bệnh nhân',
                    placeholder: 'Mã bệnh nhân',
                    fullWidth: true,
                    onKeyDown,
                  }}
                />
                <MyFormSelectField
                  name="status"
                  control={control}
                  MySelectProps={{
                    label: translate.pages.reception.status(),
                    size: 'small',
                  }}
                >
                  {Object.entries(ticketStatusWithLabel).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value.label}
                    </MenuItem>
                  ))}
                </MyFormSelectField>
              </>
            }
          />
        )}
      ></MyFormGroupUnstyled>
    </StyledFilterFormWrapper>
  );
};

const StyledFilterFormWrapper = styled('div')`
  width: 100%;
`;
