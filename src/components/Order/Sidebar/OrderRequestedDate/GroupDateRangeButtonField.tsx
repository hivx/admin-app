import { lighten, styled } from '@mui/material';
import { FC, useCallback } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

import { MyButton } from '@/components';
import { IDateRangeQuickButtonsProps } from '@/components/Elements/DatePicker/DateRangeQuickButtonsBase';
import { useTranslate } from '@/hooks';
import { useDateRangeData } from '@/hooks/useDateRangeData';
import { formatDate } from '@/utils/dateUtils';

import { SidebarRequestedDateType } from './SidebarRequestedDateForm';

export type GroupDateRangeButtonFieldProps = {
  control: Control<SidebarRequestedDateType>;
  setValue: UseFormSetValue<SidebarRequestedDateType>;
  disabledButtonAll?: boolean;
};

const DATE_BUTTON_WIDTH = '70px';

/**
 * GroupDateRangeButtonField provider data and func when click button in GroupDateRangeButton,
 */
export const GroupDateRangeButtonField: FC<GroupDateRangeButtonFieldProps> = ({
  control,
  setValue,
  disabledButtonAll = false,
}) => {
  const [requestedDateFrom, requestedDateTo] = useWatch({
    name: ['requestedDateFrom', 'requestedDateTo'],
    control,
  });

  const dateRangeQuickOptionsWithActiveState = useDateRangeData({
    dateFrom: requestedDateFrom,
    dateTo: requestedDateTo,
    showSelectAll: !disabledButtonAll,
  });

  const handleButtonClick = useCallback<IDateRangeQuickButtonsProps['onButtonClick']>(
    (e, option) => {
      setValue('requestedDateFrom', formatDate(option.dateRange.startDate));
      setValue('requestedDateTo', formatDate(option.dateRange.endDate));
    },
    [setValue],
  );
  return (
    <GroupDateRangeButton
      onButtonClick={handleButtonClick}
      options={dateRangeQuickOptionsWithActiveState}
    />
  );
};

/**
 * GroupDateRangeButton display list button,
 * User can click any button to filter Order by requestedDate
 */
const GroupDateRangeButton: FC<IDateRangeQuickButtonsProps> = (props) => {
  const translate = useTranslate();
  const { onButtonClick, options } = props;
  /**
   * active button 'Khác' when remaining buttons not active
   */
  const isActiveOptionOther = options.filter((item) => item.isActive).length
    ? false
    : true;

  return (
    <StyledButtonGroup>
      {options.map((option) => {
        return (
          <StyledButton
            key={option.label}
            onClick={(e) => onButtonClick(e, option)}
            variant={option.isActive ? 'contained' : 'outlined'}
          >
            {option.label}
          </StyledButton>
        );
      })}
      <StyledButton variant={isActiveOptionOther ? 'contained' : 'outlined'}>
        {translate.date.other()}
      </StyledButton>
    </StyledButtonGroup>
  );
};

const StyledButtonGroup = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.spacing(0.5)};
`;

const StyledButton = styled(MyButton)`
  width: ${DATE_BUTTON_WIDTH};
  min-width: ${DATE_BUTTON_WIDTH};
  text-transform: none;
  color: ${(props) =>
    props.variant === 'contained'
      ? props.theme.pacs?.customColors.textIconHoverColor
      : lighten(props.theme.palette.text.primary, 0.5)};

  background-color: ${(props) =>
    props.variant !== 'contained'
      ? 'transparent'
      : props.theme.pacs?.customColors.backgroundButtonActiveColor};
  border-color: ${(props) => lighten(props.theme.palette.text.primary, 0.5)};
  &:hover {
    color: ${(props) =>
      props.variant !== 'contained' &&
      props.theme.pacs?.customColors.textButtonActiveColor};
    border-color: ${(props) => props.theme.pacs?.customColors.borderButtonColor};
    background-color: ${(props) =>
      props.variant !== 'contained'
        ? 'transparent'
        : props.theme.pacs?.customColors.backgroundButtonActiveColor};
  }
`;
