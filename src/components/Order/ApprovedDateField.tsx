import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { InputAdornment, css, lighten, styled } from '@mui/material';
import { useMemo } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { MyTextField } from '@/components';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { useCurrentOrderID } from '@/features/order';
import { useAppSelector, useTranslate } from '@/hooks';
import { useApproveWithTimeButton } from '@/hooks/radiology/useApproveWithTimeButton';
import { useClock } from '@/hooks/useClock';
import {
  selectApproveTime,
  selectCurrentRequestID,
  selectRadiologyReportIsEditable,
} from '@/stores/OrderRadiology';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';
import { filterTransientProps } from '@/utils/filterTransientProps';

export const ApprovedDateField = () => {
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const approveTime = useAppSelector(selectApproveTime({ orderID, requestID }));
  const setTimeApproveHandler = useApproveWithTimeButton();
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(orderID));
  /**
   * current server time
   */
  const time = useClock(1000);

  const { data: order } = useGetOneOrderQuery({ id: orderID });

  /**
   * Order requested time
   */
  const requestedTime = order?.requestedTime
    ? itechDateTimeToDayjs(order?.requestedTime)
    : undefined;

  /**
   * Thời gian hiển thị
   * Khi người dùng đã thao tác chọn ngày -> hiển thị approveTime trong store
   * Ngược lại hiển thị thời gian hiện tại
   */
  const dateDisplay = approveTime ? itechDateTimeToDayjs(approveTime) : time;

  /**
   * Hiện đỏ: ngày hiện tại khác ngày chỉ định, hoặc thời gian hiện tại nhỏ hơn thời gian chỉ định
   */

  const hasInvalidApproveDate = useMemo(
    () =>
      dateDisplay?.isBefore(requestedTime) ||
      dateDisplay?.diff(requestedTime, 'day') !== 0,
    [dateDisplay, requestedTime],
  );

  const IconOpenModalPickdate = (
    <IconButtonWithToolTip
      title={translate.resources.report.selectApproveTime()}
      disabled={!isEditable}
      onClick={setTimeApproveHandler.onClick}
      size="small"
    >
      <CalendarMonthIcon color="inherit" />
    </IconButtonWithToolTip>
  );

  /**
   * Disable input chọn ngày duyệt bằng cách : disable icon InputAdornment và đổi màu ở StyledCustomTextField
   */
  return (
    <StyledCustomTextField
      $isErrorField={hasInvalidApproveDate}
      $isEditableField={isEditable}
    >
      <MyTextField
        fullWidth
        disabled={!isEditable}
        label={translate.resources.report.approvedDate()}
        size="small"
        value={dateDisplay?.format(DISPLAY_FORMAT.dateTime)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isEditable ? IconOpenModalPickdate : <></>}
            </InputAdornment>
          ),
        }}
      />
    </StyledCustomTextField>
  );
};

/**
 * Style màu theo trạng thái của ApprovedDateField
 */
const StyledCustomTextField = styled('div', filterTransientProps)<{
  $isErrorField?: boolean;
  $isEditableField: boolean;
}>`
  width: 100%;
  .MuiInputBase-root {
    ${(props) => {
      if (!props.$isEditableField) {
        return css`
          background-color: ${props.theme?.pacs?.customColors.fieldDisabledBackground};
        `;
      }

      switch (props.$isErrorField) {
        case true:
          return css`
            background-color: ${lighten(props.theme.palette.error.main, 0.6)};
          `;
        case false:
          return css`
            background-color: ${lighten(props.theme.palette.primary.main, 0.6)};
          `;
      }
    }}
  }
  .MuiInputBase-root.Mui-disabled > .MuiInputAdornment-root {
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;
