import { useDeleteOrderRequestMutation } from '@/api/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import {
  deleteCurrentProcedure,
  deleteOrderRequestData,
  deleteProcedure,
  selectCurrentProcedureData,
} from '@/stores/examinnation/createOrderSlice';
import { IOrderDTO, IProcedureDTO } from '@/types/dto';

export const useDeleteRequest = ({ order }: { order?: IOrderDTO }) => {
  const notifyModal = useNotifyModal();
  const [deleteOrderRequest] = useDeleteOrderRequestMutation();
  const proceduresDisplay = useAppSelector(selectCurrentProcedureData);
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const notifyDeleteSuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.order.requests().toLowerCase(),
    }),
  );
  const notifyDeleteError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.order.requests().toLowerCase(),
    }),
  );

  const deleteSomeDataInStore = (proceduresDisplay: IProcedureDTO | null) => {
    dispatch(deleteOrderRequestData(proceduresDisplay?.id));
    dispatch(deleteProcedure(proceduresDisplay?.id));
    dispatch(deleteCurrentProcedure());
  };

  const handleDeleteRequest = () => {
    const requestID = order?.requests?.find(
      (request) => request.procedure?.id === proceduresDisplay?.id,
    )?.id;
    notifyModal({
      message: `${translate.messages.notification.deleteRequest({
        name: `${proceduresDisplay?.name}`,
      })}`,
      options: {
        variant: 'warning',
        onConfirm: async () => {
          if (order && requestID) {
            const res = await deleteOrderRequest({
              orderID: order.id,
              requestID: requestID,
            });
            if ('error' in res) {
              notifyDeleteError();
            } else {
              deleteSomeDataInStore(proceduresDisplay);
              notifyDeleteSuccess();
            }
          } else {
            deleteSomeDataInStore(proceduresDisplay);
            notifyDeleteSuccess();
          }
        },
      },
    });
  };
  return handleDeleteRequest;
};
