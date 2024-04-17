import { useCallback } from 'react';

import { useTranslate } from '@/hooks';
import { useViewer } from '@/hooks/order/useViewer';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

type useResultButtonImageProps = {
  order?: IOrderDTO | null;
};
/**
 * get image button state & func open viewer
 * @props order
 */
export const useButtonImage = (props: useResultButtonImageProps) => {
  const { order } = props;

  const translate = useTranslate();
  const notify = useNotifySnackbar();
  const { openInNewTab } = useViewer({ orderIDs: order ? [order.id] : [] });

  const buttonState = order?.study ? BUTTON_STATE.ACTIVE : BUTTON_STATE.DISABLED;

  const openViewer = useCallback(() => {
    if (buttonState === BUTTON_STATE.ACTIVE) {
      return openInNewTab();
    } else {
      notify({
        message: translate.messages.notification.noStudyInOrder(),
        options: {
          variant: 'warning',
        },
      });
    }
  }, [buttonState, notify, openInNewTab, translate.messages.notification]);

  return { onClick: openViewer, buttonState };
};
