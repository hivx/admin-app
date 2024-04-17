import { styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { ContextMenuContentShell } from '@/components/Menu/ContextMenuContentShell';
type OrderButtonMenuShellProps = {
  children?: ReactNode;
};
const OrderMenuShell: FC<OrderButtonMenuShellProps> = (props) => {
  return <ContextMenuContentShell>{props.children}</ContextMenuContentShell>;
};

export default OrderMenuShell;
