import { Control, Path } from 'react-hook-form';

import { MyTextField } from '@/components';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';

import { ISearchOrderFilterForm } from './OrderListFilterForm';

type OrderListFilterReportStatusFieldProps = {
  name: Path<ISearchOrderFilterForm>;
  control: Control<ISearchOrderFilterForm>;
  reportStatusFromQuery: ISearchOrderFilterForm['reportStatus'];
};
/**
 * report status data type
 */
export type ReportStatusData =
  | {
      id: string;
      status: `${ORDER_DIAGNOSIS_STEP_STATUS}`;
    }
  | {
      id: 'Tất cả';
      status: '';
    };

/**
 * convert from array status ->  data use for AutoCompleteForm
 */
export const getListStatusDataForAutoComplete = (
  status: ISearchOrderFilterForm['reportStatus'],
) => {
  const reportStatus: ReportStatusData[] =
    status?.map((item) => {
      return { id: item, status: item };
    }) || [];
  return reportStatus;
};

/**
 * Report status auto complete fields
 * reportStatusFromQuery is value to display
 */

export const FilterReportStatusAutoCompleteField = (
  props: OrderListFilterReportStatusFieldProps,
) => {
  const { control, name, reportStatusFromQuery } = props;

  const translate = useTranslate();

  const reportStatuses: ReportStatusData[] = [];

  /**
   * convert array of object
   */
  for (const [key, value] of Object.entries(ORDER_DIAGNOSIS_STEP_STATUS)) {
    reportStatuses.push({ id: key, status: value });
  }

  const finaleReportStatuses: ReportStatusData[] = [...reportStatuses];

  return (
    <MyFormAutoComplete
      name={name}
      control={control}
      limitTags={2}
      MyAutoCompleteProps={{
        size: 'small',
        value: getListStatusDataForAutoComplete(reportStatusFromQuery),
        renderInput: (params) => (
          <MyTextField
            {...params}
            label={translate.resources.order.reportStatus()}
            placeholder={translate.resources.order.reportStatus()}
            size="small"
          />
        ),
        options: finaleReportStatuses,
        disableCloseOnSelect: false,
        isOptionEqualToValue: (option, value) => option.status === value.status,
        getOptionLabel: (option) => {
          if (typeof option !== 'string') {
            return option.status
              ? translate.resources.order.reportStatusMessage({
                  status: option.status,
                })
              : '';
          }
          return '';
        },
        renderOption: (props, option) => {
          return (
            <li {...props}>
              <StyledDivLeftChildren>
                {option.status
                  ? translate.resources.order.reportStatusMessage({
                      status: option.status,
                    })
                  : '\u00A0'}
              </StyledDivLeftChildren>
            </li>
          );
        },
      }}
    />
  );
};
