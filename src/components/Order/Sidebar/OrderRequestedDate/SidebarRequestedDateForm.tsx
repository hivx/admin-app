import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, lighten, styled } from '@mui/material';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { MyFormDateRangePicker } from '@/components/Form/MyFormDateRangePicker';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { ITableID, setTableFilter } from '@/stores/table/tableSlice';
import { ISearchOrderFilter } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import {
  GroupDateRangeButtonField,
  GroupDateRangeButtonFieldProps,
} from './GroupDateRangeButtonField';

export type SidebarRequestedDateType = Pick<
  ISearchOrderFilter,
  'requestedDateFrom' | 'requestedDateTo'
>;
/**
 * Wrap list button quick pick date and form pick date fields
 */
export const SidebarRequestedDateForm = ({
  tableID,
  disabledButtonAll,
}: {
  tableID: ITableID;
} & Pick<GroupDateRangeButtonFieldProps, 'disabledButtonAll'>) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(getCurrentTableQuery<ISearchOrderFilter>(tableID));

  const formOptions: UseFormProps<SidebarRequestedDateType> = {
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        requestedDateFrom: z
          .string()
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
        requestedDateTo: z.string().optional().transform(mapNullOrEmptyStringToUndefined),
      }),
    ),
    defaultValues: {
      requestedDateFrom: query?.filter.requestedDateFrom ?? undefined,
      requestedDateTo: query?.filter.requestedDateTo ?? undefined,
    },
  };

  const onSubmit = (formData: SidebarRequestedDateType) => {
    const { requestedDateFrom, requestedDateTo } = formData;
    dispatch(
      setTableFilter({
        tableId: tableID,
        filter: { ...query?.filter, requestedDateFrom, requestedDateTo },
      }),
    );
  };

  return (
    <MyFormGroupUnstyled
      formOptions={formOptions}
      onSubmit={onSubmit}
      autoSubmit
      renderInputs={({ control, setValue, watch }) => (
        <Stack spacing={0.5}>
          <GroupDateRangeButtonField
            control={control}
            setValue={setValue}
            disabledButtonAll={disabledButtonAll}
          />
          <StyledStidebarDatePickerWrapper>
            <MyFormDateRangePicker
              nameStart="requestedDateFrom"
              nameEnd="requestedDateTo"
              formSetValue={setValue}
              watch={watch}
            />
          </StyledStidebarDatePickerWrapper>
        </Stack>
      )}
    />
  );
};

const StyledStidebarDatePickerWrapper = styled('div')`
  .MuiInputBase-root {
    padding-right: ${(props) => props.theme.spacing(1)};
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => lighten(props.theme.palette.text.primary, 0.5)};
  }
  .MuiInputBase-input {
    color: ${(props) => lighten(props.theme.palette.text.primary, 0.5)};
    font-size: ${(props) => props.theme.typography.body2};
    padding-left: ${(props) => props.theme.spacing(1.5)};
  }
`;
