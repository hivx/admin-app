import { Control, Path } from 'react-hook-form';

import { useLazyGetListUsersQuery } from '@/api/users';
import { MyTextField } from '@/components';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { ICloudUserDTO, USER_TYPE } from '@/types/dto';

import { ISearchOrderFilterForm } from './OrderListFilterForm';

type OrderListFilterApproverAutoCompleteFieldProps = {
  name: Path<ISearchOrderFilterForm>;
  control: Control<ISearchOrderFilterForm>;
};

export type ApproverData =
  | ICloudUserDTO
  | {
      id: -1;
      fullname: '';
      username: '';
    };

export const OrderListFilterApproverAutoCompleteField = (
  props: OrderListFilterApproverAutoCompleteFieldProps,
) => {
  const { control, name } = props;
  const translate = useTranslate();
  const [triggerSearchUser, { data: userData }] = useLazyGetListUsersQuery();
  const userList = userData?.list ?? [];

  const finalApproverList: ApproverData[] = [
    { id: -1, fullname: '', username: '' },
    ...userList,
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
            label={translate.resources.order.reporter.long()}
            placeholder={translate.resources.order.reporter.long()}
            size="small"
            onClick={() =>
              triggerSearchUser({ filter: { types: [USER_TYPE.IMAGING_DOCTOR] } }, true)
            }
          />
        ),
        options: finalApproverList,
        disableCloseOnSelect: false,
        isOptionEqualToValue: (option, value) => option.id === value.id,
        getOptionLabel: (option) => {
          if (typeof option !== 'string') {
            return option.username ? `${option.fullname}` : '';
          }
          return '';
        },
        renderOption: (props, option) => {
          return (
            <li {...props}>
              <StyledDivLeftChildren>
                {option.username ? `${option.fullname}` : '\u00A0'}
              </StyledDivLeftChildren>
            </li>
          );
        },
      }}
    />
  );
};
