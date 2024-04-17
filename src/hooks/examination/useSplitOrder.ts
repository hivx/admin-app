import { useDeleteStudyInOrderMutation } from '@/api/orderStudy';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { useTranslate } from '../useTranslate';

export const useSplitOrder = ({ order }: { order?: IOrderDTO }) => {
  const [deleteStudyInOrder] = useDeleteStudyInOrderMutation();
  const notifyModal = useNotifyModal();
  const translate = useTranslate();
  const hasStudy = !!order?.study?.id && !!order?.id;

  /**
   * enabled chức năng tách cho Chỉ định tạo từ HIS/TAG và đã có ảnh
   */
  const orderCanSplit =
    hasStudy && (order?.creationType === 'HIS' || order?.creationType === 'RIS');

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.splitResource({
      resource: translate.resources.study.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.splitResource({
      resource: translate.resources.study.title().toLowerCase(),
    }),
  );

  const handleClick = () => {
    notifyModal({
      message: translate.messages.notification.splitStudyOrder({
        patientOrderName: order?.patient?.fullname ?? '',
        patientStudyName: order?.study?.patientName ?? '',
        accessionNumber: order?.accessionNumber ?? '',
        requestedDate:
          itechDateTimeToDayjs(order?.requestedTime ?? '')?.format(
            DISPLAY_FORMAT.dateTimeNoSecond,
          ) ?? '',
        studyIUID: order?.study?.studyInstanceUID ?? '',
      }),
      options: {
        variant: 'warning',
        onConfirm: () => {
          if (order) {
            const res = deleteStudyInOrder({ orderID: order.id });
            if ('error' in res) {
              notifyError();
            } else {
              notifySuccess();
              close();
            }
          }
        },
      },
    });
  };
  return { orderCanSplit, onClick: handleClick };
};
