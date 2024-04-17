import { lighten, styled } from '@mui/material';
import { FC } from 'react';

import { MyTextField } from '@/components';
import { DateTimePickerCommonProps } from '@/components/Elements/DatePicker/MyStaticDatePickerWithPopup';
import MyStaticDateTimePickerWithPopup from '@/components/Elements/DatePicker/MyStaticDateTimePickerWithPopup';
import { MyTooltip } from '@/components/Elements/Tooltip/MyTooltip';
import { useDisclosure } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { DISPLAY_FORMAT } from '@/utils/dateUtils';
import { filterTransientProps } from '@/utils/filterTransientProps';

type RadiologyDateTimePicker = DateTimePickerCommonProps & {
  error?: boolean;
  helperTextForTooltip?: string;
};
/**
 * Trường chọn / hiển thị thời gian ở các trường Chỉ định, Thực hiện, Duyệt KQ trong panel đọc ca
 */
export const RadiologyDateTimePicker: FC<RadiologyDateTimePicker> = ({
  onChange,
  value,
  disabled,
  error,
  helperTextForTooltip,
  label,
}) => {
  const { close, isOpen, open } = useDisclosure(false);
  return (
    <MyTooltip
      title={error ? helperTextForTooltip : undefined}
      placement={'top'}
      style={{ width: '100%' }}
    >
      <StyledRadiologyDateTimePicker $disabled={disabled} $error={error}>
        <MyStaticDateTimePickerWithPopup
          onChange={onChange}
          open={isOpen}
          onClose={() => close()}
          disabled={disabled}
          slotProps={{
            textField: {
              onDoubleClick: () => (!disabled ? open() : undefined),
              style: { width: '100%' },
              label: label,
              error: false,
              size: 'small',
            },
            inputAdornment: { sx: { display: 'none' } },
            actionBar: { actions: ['today', 'accept'] },
          }}
          value={value}
          format={DISPLAY_FORMAT.dateTimeNoSecond}
        />
      </StyledRadiologyDateTimePicker>
    </MyTooltip>
  );
};

export const StyledRadiologyDateTimePicker = styled('div', filterTransientProps)<{
  $disabled?: boolean;
  $error?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .MuiInputBase-input {
    padding: 8px;
    color: ${(props) => {
      if (props.$error) {
        return props.theme.palette.error.main;
      }
      if (props.$disabled) {
        return lighten(props.theme?.palette.text.primary, 0.3);
      }
      return props.theme.palette.primary.main;
    }};
    :hover {
      ${(props) => !props.$disabled && globalStyles.onMenuHover}
    }
    :disabled {
      -webkit-text-fill-color: ${(props) => props.theme.pacs?.customColors.text.label};
    }
  }
  /* .MuiInputLabel-root {
    transform: translate(14px, 16px) scale(1);
  } */
  .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => {
      if (props.$error) {
        return props.theme.palette.error.main;
      }
    }}!important;
  }
  /* .MuiOutlinedInput-root {
    padding-right: 0px;
    .MuiOutlinedInput-notchedOutline {
      padding: 0px;
    }
  }

  fieldset {
    border: none;
  } */
`;
