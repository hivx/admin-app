import { darken, lighten, styled } from '@mui/material';

import { ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';
import { filterTransientProps } from '@/utils/filterTransientProps';

type StyledOrderTableRowProps = {
  $reportStatus?: `${ORDER_DIAGNOSIS_STEP_STATUS}` | null;
  $urgent?: boolean | null;
};

/**
 * Custom row color depending on input data
 * Must wrap this component for every column definitions
 */
const StyledOrderTableRow = styled('div', filterTransientProps)<StyledOrderTableRowProps>`
  color: ${(props) => {
    switch (props.$reportStatus) {
      case 'APPROVED':
        return props.theme.palette.text.primary;
      case 'NOT_READY':
        return props.theme.pacs?.customColors.text.green;
      case 'NOT_STARTED':
        if (props.$urgent) return props.theme.pacs?.customColors.text.red;
        return props.theme.pacs?.customColors.text.blue;
      case 'PENDING_APPROVAL':
        return props.theme.pacs?.customColors.text.orange;
      default:
        return;
    }
  }};
`;

export default {
  StyledOrderTableRow,
};
