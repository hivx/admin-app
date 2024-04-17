import { useAppSelector, useTranslate } from '@/hooks';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { RESOURCES } from '@/types/resources';

import { useResendEventMutation } from '../api/eventLog';
import { IEventLogDTO } from '../types';

/**
 * Hook xử lý logic Gửi lại bản tin
 */
export const useResendLogButtonState = (onSuccessCallback?: () => void) => {
  const record = useAppSelector(getCurrentSelectedRow<IEventLogDTO>(RESOURCES.EVENT_LOG));
  const translate = useTranslate();

  const notifyModal = useNotifyModal();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.eventLog.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.eventLog.title().toLowerCase(),
    }),
  );

  const [triggerResend] = useResendEventMutation();

  const handleClickButton = () => {
    notifyModal({
      message: translate.messages.notification.resendRequest({
        type: record?.type ?? '',
        key: record?.key ?? '',
      }),
      options: {
        variant: 'warning',
        onConfirm: () => {
          onResend();
        },
      },
    });
  };

  const onResend = async () => {
    if (record) {
      const response = await triggerResend({ id: record.id });
      if ('error' in response) {
        notifyError();
      } else {
        notifySuccess();
        onSuccessCallback && onSuccessCallback();
      }
    }
  };

  return { handleClickButton };
};
