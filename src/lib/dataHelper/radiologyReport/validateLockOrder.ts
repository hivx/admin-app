/**
 * Tổng hợp các logic check cho chức năng nhận ca
 * https://docs.google.com/spreadsheets/d/1vjVNLf4Pby7jfZp6xxsHRKh7KmTfBsp7OoSYtGYCgyU/edit#gid=1475397990
 */

import { translate } from '@/hooks';
import { IUserPermissions } from '@/lib/dataHelper/getUserPermissisons';
import { NotificationController } from '@/providers/NotificationProvider';
import { IOrderDTO, IOrderRequestDTO, IUserDTO } from '@/types/dto';

/**
 * Check SƠ BỘ khả năng enable khoá ca được
 */
export const getIsEnableLockOrder = (
  permissions: IUserPermissions,
  request: IOrderRequestDTO,
): boolean => !!permissions?.userCanLockOrder && !request.finalReportID;

export enum LOCK_ORDER_VALIDATION_RESULT {
  /**
   * Người khoá chính là user hiện tại
   */
  LOCKED_SAME_USER = 'LOCKED_SAME_USER',
  /**
   * User có level cao hơn người khoá
   */
  LOCKED_HIGHER_LEVEL = 'LOCKED_HIGHER_LEVEL',
  /**
   * User có level thấp hơn người khoá
   */
  LOCKED_LOWER_LEVEL = 'LOCKED_LOWER_LEVEL',
  /**
   * Người duyệt ca có level cao hơn người dùng hiện tại -> k thể nhận ca lại
   */
  APPROVED_HIGHER_LEVEL = 'APPROVED_HIGHER_LEVEL',

  /**
   * Ca chụp chưa được khoá
   */
  UNLOCKED = 'UNLOCKED',
}

type GetIsOrderLockAbleOptions = {
  order: IOrderDTO;
  request?: IOrderRequestDTO;
  currentUser: IUserDTO;
};

type GetIsOrderLockAbleLazyOptions = {
  getOrderFn: () => Promise<IOrderDTO>;
  getRequestFn?: () => Promise<IOrderRequestDTO>;
  currentUser: IUserDTO;
};

/**
 * Kiểm tra khả năng nhận ca chụp lazy
 */
export const getIsOrderLockAbleLazy = async (options: GetIsOrderLockAbleLazyOptions) => {
  const { getOrderFn, currentUser, getRequestFn } = options;
  const order = await getOrderFn();
  const request = getRequestFn && (await getRequestFn());
  return getIsOrderLockAble({ order, currentUser, request });
};

/**
 * Kiểm tra khả năng nhận ca chụp
 */
export const getIsOrderLockAble = async (
  options: GetIsOrderLockAbleOptions,
): Promise<boolean> => {
  return new Promise((resolve) => {
    const { order, currentUser, request } = options;
    const lockStatus = getOrderLockStatus(order, currentUser, request);
    switch (lockStatus) {
      case LOCK_ORDER_VALIDATION_RESULT.LOCKED_SAME_USER:
        resolve(true);
        return;
      case LOCK_ORDER_VALIDATION_RESULT.LOCKED_HIGHER_LEVEL:
        NotificationController.notifyModal({
          message: `${translate?.messages.notification.orderAlreadyLocked({
            name: order?.lockedBy?.fullname || '',
          })} ${translate?.messages.notification.orderLockConfirm()}`,
          options: {
            variant: 'warning',
            onConfirm: async () => {
              resolve(true);
            },
            onCancel: () => resolve(false),
          },
        });
        break;
      case LOCK_ORDER_VALIDATION_RESULT.LOCKED_LOWER_LEVEL:
        NotificationController.notifySnackbar({
          message: `${translate?.messages.notification.orderAlreadyLocked({
            name: order?.lockedBy?.fullname || '',
          })}`,
          options: {
            variant: 'warning',
          },
        });
        return resolve(false);
      case LOCK_ORDER_VALIDATION_RESULT.APPROVED_HIGHER_LEVEL:
        NotificationController.notifySnackbar({
          message: `${translate?.messages.notification.orderRequestApprovedByUser({
            name: request?.finalApprover?.fullname || '',
          })}`,
          options: {
            variant: 'warning',
          },
        });
        return resolve(false);
      case LOCK_ORDER_VALIDATION_RESULT.UNLOCKED:
        resolve(true);
        return;
    }
  });
};

/**
 * Lấy trạng thái khoá của ca chụp
 */
export const getOrderLockStatus = (
  order: IOrderDTO,
  currentUser: IUserDTO,
  request?: IOrderRequestDTO,
): LOCK_ORDER_VALIDATION_RESULT => {
  /**
   * Level người dùng hiện tại
   */
  const currentLevel = currentUser.level ?? 0;
  if (!order.lockedBy) {
    /**
     * Level người dùng đã duyệt request
     */
    const approvedLevel = request?.finalApprover?.level ?? 0;
    /**
     * Kiểm tra level của user hiện tại với level của người đã duyệt.
     */
    if (
      request?.finalReportID &&
      currentUser.id !== request.finalApprover?.id &&
      currentLevel - approvedLevel <= 0
    ) {
      return LOCK_ORDER_VALIDATION_RESULT.APPROVED_HIGHER_LEVEL;
    }
    return LOCK_ORDER_VALIDATION_RESULT.UNLOCKED;
  } else {
    if (order.lockedBy.id === currentUser.id) {
      return LOCK_ORDER_VALIDATION_RESULT.LOCKED_SAME_USER;
    } else {
      // Người khoá khác với user hiện tại
      const lockedLevel = order.lockedBy.level ?? 0;
      if (currentLevel > lockedLevel)
        return LOCK_ORDER_VALIDATION_RESULT.LOCKED_HIGHER_LEVEL;
      else return LOCK_ORDER_VALIDATION_RESULT.LOCKED_LOWER_LEVEL;
    }
  }
};
