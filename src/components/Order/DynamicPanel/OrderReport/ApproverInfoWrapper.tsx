import React, { FC } from 'react';

import { IOrderRequestDTO } from '@/types/dto';

import OrderInfoTypography from '../../Panel/OrderInfoTypography';

type ApprovedInfoWrapperProps = {
  request?: IOrderRequestDTO;
};

/**
 *  Display approver and time approve
 */
export const ApproverInfoWrapper: FC<ApprovedInfoWrapperProps> = ({ request }) => {
  const approver = request?.finalApprover?.fullname;
  const approvedInfo = approver ? `${approver} ` : '';
  return (
    <OrderInfoTypography title={approvedInfo ?? ''}>{approvedInfo}</OrderInfoTypography>
  );
};
