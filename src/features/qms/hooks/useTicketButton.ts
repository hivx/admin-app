import React from 'react';

import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';

import { useUpdateTicketMutation } from '../api/ticket';
import { ITicketDTO, TICKET_STEP_STATUS } from '../types/ticket';

type useTicketButtonProps = {
  record?: ITicketDTO;
};

export const useTicketButton = (props: useTicketButtonProps) => {
  const { record } = props;
  const [updateTicket] = useUpdateTicketMutation();

  const notifyPassingSuccess = useGenericNotifySnackbar('success', 'Bỏ lượt');

  const notifyPassingError = useGenericNotifySnackbar(
    'error',
    'Bỏ lượt không thành công',
  );

  const notifyCompletedSuccess = useGenericNotifySnackbar('success', 'Hoàn thành');

  const notifyCompletedError = useGenericNotifySnackbar(
    'error',
    'Xác nhận hoàn thành thất bại',
  );

  const passingTicket = async () => {
    if (record) {
      const res = await updateTicket({
        status: TICKET_STEP_STATUS.PASSING,
        id: record.id,
      });
      if ('error' in res) {
        notifyPassingError();
      } else {
        notifyPassingSuccess();
      }
    }
  };

  const completeTicket = async () => {
    if (record) {
      const res = await updateTicket({
        status: TICKET_STEP_STATUS.COMPLETED,
        id: record.id,
      });
      if ('error' in res) {
        notifyCompletedError();
      } else {
        notifyCompletedSuccess();
      }
    }
  };

  return { passingTicket, completeTicket };
};
