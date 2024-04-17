import { useGetOneOrderQuery } from '@/api/order';
import {
  useCancelApprovedRequestMutation,
  useGetOneOrderRequestQuery,
} from '@/api/orderRequest';
import { useCurrentOrderID } from '@/features/order';
import { IUserPermissions } from '@/lib/dataHelper/getUserPermissisons';
import { useUserPermission } from '@/providers/AuthProvider';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import { selectCurrentUser } from '@/stores/auth';
import { selectCurrentRequestID } from '@/stores/OrderRadiology';
import { BUTTON_STATE } from '@/types';
import { IOrderRequestDTO, IUserDTO } from '@/types/dto';
import { DISPLAY_FORMAT, formatDateTime, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { useAppSelector, useTranslate } from '..';

/**
 * hook trả ra state,func dùng cho nút Hủy duyệt
 */
export const useCancelApproveButton = () => {
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const { data: order } = useGetOneOrderQuery({ id: orderID }, { skip: !orderID });

  const { data: request } = useGetOneOrderRequestQuery({
    orderID,
    requestID,
  });
  const currentUser = useAppSelector(selectCurrentUser);
  const notifyModal = useNotifyModal();
  const [triggerCancelApprovedRequest] = useCancelApprovedRequestMutation();
  const userPermissions = useUserPermission();

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.notification.cancelApprovedRequest(),
  );
  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.notification.cancelApprovedRequest(),
  );

  const onCancelApprovedRequest = async () => {
    if (request) {
      notifyModal({
        message: `${translate.messages.notification.cancelApproved({
          code: request.id.toString() ?? '',
          approveTime:
            itechDateTimeToDayjs(request.finalApprovedTime)?.format(
              DISPLAY_FORMAT.dateTimeNoSecond,
            ) ?? '',
          operationTime:
            itechDateTimeToDayjs(request.operationTime)?.format(
              DISPLAY_FORMAT.dateTimeNoSecond,
            ) ?? '',
          patient: order?.patient?.fullname ?? '',
          procudure: request.procedure?.name ?? '',
        })}`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            try {
              const res = triggerCancelApprovedRequest({
                orderID,
                requestID: request.id,
              });
              if ('error' in res) {
                notifyError();
              } else {
                notifySuccess();
              }
            } catch (e) {
              notifyError();
            }
          },
        },
      });
    }
  };

  const buttonState = getCancelApproveButtonState({
    currentUser: currentUser ?? undefined,
    userPermissions,
    request,
  });

  return {
    buttonState: buttonState,
    onClick: onCancelApprovedRequest,
    onListItemClick: onCancelApprovedRequest,
    label: translate.pages.orderReport.actions.cancelApprove(),
  };
};

const getCancelApproveButtonState = ({
  userPermissions,
  currentUser,
  request,
}: {
  userPermissions: IUserPermissions;
  currentUser?: IUserDTO;
  request?: IOrderRequestDTO;
}) => {
  let approveButtonState = BUTTON_STATE.DISABLED;
  const userCanRecallApprovedReport =
    userPermissions?.userCanRecallApprovedReport ?? false;

  if (request && request.finalReportID && request.finalApprover && currentUser) {
    const approveUser = request.finalApprover;
    const isSameUser = currentUser.id === approveUser.id;
    const currentLevel = currentUser.level ?? 0;
    const approveLevel = approveUser.level ?? 0;
    const levelHigherThanApprover = currentLevel > approveLevel;

    if ((userCanRecallApprovedReport && isSameUser) || levelHigherThanApprover) {
      approveButtonState = BUTTON_STATE.ACTIVE;
    }
  }
  return approveButtonState;
};
