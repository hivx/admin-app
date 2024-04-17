import { Control, Path } from 'react-hook-form';

import { useLazyGetListDepartmentsQuery } from '@/api/departments';
import { MyTextField } from '@/components';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { IDepartmentDTO } from '@/types/dto';

import { ISearchOrderFilterForm } from './OrderListFilterForm';

type OrderListFilterRequestDepartmentAutoCompleteFieldProps = {
  name: Path<ISearchOrderFilterForm>;
  control: Control<ISearchOrderFilterForm>;
};

export type RequestDepartmentData =
  | IDepartmentDTO
  | {
      id: -1;
      name: '';
      code: '';
    };

export const OrderListFilterRequestDepartmentAutoCompleteField = (
  props: OrderListFilterRequestDepartmentAutoCompleteFieldProps,
) => {
  const { control, name } = props;

  const translate = useTranslate();

  const [triggerSearchDepartment, { data: departmentData }] =
    useLazyGetListDepartmentsQuery();
  const departmentList = departmentData?.list ?? [];
  const finalDepartmentList: RequestDepartmentData[] = [
    { id: -1, name: '', code: '' },
    ...departmentList,
  ];
  return (
    <MyFormAutoComplete
      name={name}
      control={control}
      MyAutoCompleteProps={{
        size: 'small',
        multiple: false,
        renderInput: (params) => (
          <MyTextField
            {...params}
            label={translate.resources.order.requestedDepartment.long()}
            placeholder={translate.resources.order.requestedDepartment.long()}
            size="small"
            onClick={() => triggerSearchDepartment({ filter: {} }, true)}
          />
        ),
        options: finalDepartmentList,
        disableCloseOnSelect: false,
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) => {
          if (typeof option !== 'string') {
            return option.name ? `${option.name} (${option.code})` : '';
          }
          return '';
        },
        renderOption: (props, option) => {
          return (
            <li {...props}>
              <StyledDivLeftChildren>
                {option.name ? `${option.name} (${option.code})` : '\u00A0'}
              </StyledDivLeftChildren>
            </li>
          );
        },
      }}
    />
  );
};
