import { Stack } from '@mui/system';
import React, { ReactNode } from 'react';
type OrderStatusesShellProps = {
  SignStatus: ReactNode;
  RequestStatus: ReactNode;
};
const OrderStatusesShell = (props: OrderStatusesShellProps) => {
  const { SignStatus, RequestStatus } = props;
  return (
    <Stack
      direction="row-reverse"
      spacing={1}
      alignItems={'center'}
      justifyContent={'start'}
    >
      {SignStatus}
      {RequestStatus}
    </Stack>
  );
};

export default OrderStatusesShell;
