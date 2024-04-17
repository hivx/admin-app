import { styled } from '@mui/material';

import { filterTransientProps } from '@/utils/filterTransientProps';

/**
 * Custom row color depending on input data
 * Must wrap this component for every column definitions
 *
 *
 */
export const StyledEventLogTableRow = styled('div', filterTransientProps)<{
  $succeeded: boolean;
  $attempts: number;
}>`
  color: ${(props) => {
    // Trạng thái gửi : succeeded = false
    if (!props.$succeeded) {
      // Số lần gửi lại : attempts = 3 -> màu đỏ
      if (props.$attempts === 3) {
        return props.theme.pacs?.customColors.text.red;
      }
      // Số lần gửi lại : attempts < 3 -> màu xanh (TT đang gửi)
      if (!props.$succeeded && props.$attempts < 3)
        return props.theme.pacs?.customColors.text.blue;
    }
  }};
`;
