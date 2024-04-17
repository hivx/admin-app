import { styled } from '@mui/material';
import { FC, MouseEvent } from 'react';

import { MyButton, MyButtonGroup } from '../Buttons';

import { IDateRange } from './MyDateRangePickerPopup';

export type IDateRangeOption = {
  label: string;
  dateRange: IDateRange;
  isActive?: boolean;
};
export type IDateRangeQuickButtonsProps = {
  options: IDateRangeOption[];
  onButtonClick: (e: MouseEvent<HTMLButtonElement>, option: IDateRangeOption) => void;
};

/**
 * Handles UI
 */
export const DateRangeQuickButtonsBase: FC<IDateRangeQuickButtonsProps> = (props) => {
  const { options, onButtonClick } = props;
  return (
    <MyButtonGroup size="large" fullWidth>
      {options.map((option) => {
        return (
          <StyledMyButton
            key={option.label}
            onClick={(e) => onButtonClick(e, option)}
            variant={option.isActive ? 'contained' : 'outlined'}
          >
            {option.label}
          </StyledMyButton>
        );
      })}
    </MyButtonGroup>
  );
};

const StyledMyButton = styled(MyButton)`
  background-color: ${(props) =>
    props.variant === 'contained'
      ? props.theme.pacs?.customColors.backgroundButtonActiveColor
      : ''};

  &:hover {
    background-color: ${(props) =>
      props.variant === 'contained'
        ? props.theme.pacs?.customColors.backgroundButtonActiveColor
        : ''};
  }
`;
