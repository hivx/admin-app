import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';

import { LockIcon } from '@/assets/icon';
import SignIcon from '@/assets/icon/SignIcon';
import { MyTooltip } from '@/components/Elements/Tooltip/MyTooltip';
import { useHospitalProvider } from '@/providers/HospitalConfigProvider';
import { IOrderDTO, ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';

import { HisReportStatusIcon } from './HisReportStatusIcon';

type OrderTableInfoColumnProps = {
  order: IOrderDTO;
};
const ICON_SIZE = '0.8rem';

const getIconStatusDisplay = ({
  order,
  isConnectHsm,
}: OrderTableInfoColumnProps & { isConnectHsm?: boolean }) => {
  /**
   * Icon ký số hiển thị khi PACS có kết nối HSM
   */
  const showSignIcon = isConnectHsm;

  const isApproved = order.reportStatus === ORDER_DIAGNOSIS_STEP_STATUS.APPROVED;

  const hasSignedError = !order.requests
    ?.map((request) => !!request.finalSignedReportID) // get array boolean, check request has signedFileID
    .filter((singedFileID) => singedFileID).length; // filter out requests that doesnt have signedFileID // length > 0 --> there are request that hasnt been signed

  /**
   * display invalid study icon
   */
  const hasStudyError = !order.study;

  /**
   * allow display sign error icon
   */
  const displaySignedErrorIcon = showSignIcon && hasSignedError && isApproved;

  return { displaySignedErrorIcon, hasStudyError };
};

/**
 * icon có thể hiển thị ở cột TT ca
 * Ca được khóa
 * Ca Kí số lỗi
 * Ca đã duyệt nhưng k có ảnh
 */
const OrderTableInfoColumn: FC<OrderTableInfoColumnProps> = (props) => {
  const { order } = props;
  const { isConnectHsm } = useHospitalProvider();
  const { displaySignedErrorIcon, hasStudyError } = getIconStatusDisplay({
    order,
    isConnectHsm,
  });

  return (
    <Stack spacing={0.5} direction="row" justifyContent={'left'} alignItems={'center'}>
      {/* {order.reportStatus && <OrderReportStatusColumn status={order.reportStatus} />} */}
      {order.requests && order.requests[0].hisReportStatus && (
        <HisReportStatusIcon
          status={order.requests[0].hisReportStatus}
          isApproved={order.reportStatus === 'APPROVED'}
        />
      )}
      {order.lockedBy?.id && (
        <MyTooltip title={`BS. ${order.lockedBy.fullname}`}>
          <Box display="flex" alignItems="center">
            <LockIcon color="primary" sx={{ fontSize: ICON_SIZE }} />
          </Box>
        </MyTooltip>
      )}

      {displaySignedErrorIcon && (
        <SignIcon
          sx={{
            fontSize: ICON_SIZE,
          }}
        />
      )}

      {hasStudyError && (
        <VisibilityOffIcon
          color="error"
          sx={{
            fontSize: ICON_SIZE,
          }}
        />
      )}
    </Stack>
  );
};

export default OrderTableInfoColumn;
