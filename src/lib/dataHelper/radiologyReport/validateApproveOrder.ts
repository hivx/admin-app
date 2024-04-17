/**
 * Tổng hợp các logic check cho chức năng duyệt ca
 * https://docs.google.com/spreadsheets/d/1vjVNLf4Pby7jfZp6xxsHRKh7KmTfBsp7OoSYtGYCgyU/edit#gid=1475397990
 */

import { translate } from '@/hooks';
import { IUserPermissions } from '@/lib/dataHelper/getUserPermissisons';
import { NotificationController } from '@/providers/NotificationProvider';
import { IOrderDTO, IOrderRequestDTO, IUserDTO } from '@/types/dto';

import { getOrderLockStatus, LOCK_ORDER_VALIDATION_RESULT } from './validateLockOrder';

/**
 * Check SƠ BỘ khả năng enable duyệt ca được
 */
export const getIsEnableApproveOrder = (
  permissions: IUserPermissions,
  request: IOrderRequestDTO,
): boolean => !!permissions?.userCanApproveOrder && !request.finalReportID;

export enum APPROVE_ORDER_VALIDATION_STATUS {
  /**
   * cho phép duyệt ngay
   */
  SUCCESS = 'SUCCESS',
  /**
   * ca được duyệt bởi cùng user
   */
  SUCCESS_APPROVED_SAME_USER = 'SUCCESS_APPROVED_SAME_USER',
  /**
   * không duyệt được vì đã có người khác khoá ca
   */
  FAILURE_LOCKED_BY_OTHER = 'FAILURE_LOCKED_BY_OTHER',
  /**
   * không duyệt được vì đã có người khác duyệt ca
   */
  FAILURE_APPROVED_BY_OTHER = 'FAILURE_APPROVED_BY_OTHER',
  /**
   * không duyệt được vì user không đồng ý
   */
  FAILURE_USER_CANCELLED = 'FAILURE_USER_CANCELLED',
  /**
   * Không duyệt được vì lý do khác
   */
  FAILURE = 'FAILURE',
}

type GetIsOrderApprovableLazyOptions = {
  /**
   * Dùng để fetch order mới nhất
   */
  getOrderFn: () => Promise<IOrderDTO>;
  /**
   * Dùng để lấy request trong order
   */
  requestID: IOrderRequestDTO['id'];
  currentUser: IUserDTO;
};

type GetIsOrderApprovableOptions = {
  /**
   * Order hiện tại
   */
  order: IOrderDTO;
  /**
   * Dùng để lấy request trong order
   */
  requestID: IOrderRequestDTO['id'];
  currentUser: IUserDTO;
};

export type IsOrderApprovableResult = {
  status: APPROVE_ORDER_VALIDATION_STATUS;
  isLocked: boolean;
  request?: IOrderRequestDTO;
  order: IOrderDTO;
};

/**
 * Kiểm tra khả năng nhận ca chụp lazy
 */
export const getIsOrderApprovableLazy = async (
  options: GetIsOrderApprovableLazyOptions,
): Promise<IsOrderApprovableResult> => {
  const { getOrderFn, currentUser, requestID } = options;
  const order = await getOrderFn();
  return getIsOrderApprovable({ currentUser, order, requestID });
};

/**
 * Kiểm tra khả năng nhận ca chụp
 */
export const getIsOrderApprovable = async (
  options: GetIsOrderApprovableOptions,
): Promise<IsOrderApprovableResult> => {
  const { order, requestID, currentUser } = options;
  const request = order.requests?.find((request) => request.id === requestID);
  return new Promise((resolve) => {
    let isLocked = false;
    if (request) {
      const lockStatus = getOrderLockStatus(order, currentUser);
      switch (lockStatus) {
        case LOCK_ORDER_VALIDATION_RESULT.LOCKED_SAME_USER:
          isLocked = true;
          break;
        case LOCK_ORDER_VALIDATION_RESULT.LOCKED_HIGHER_LEVEL:
          isLocked = true;
          return resolve({
            status: APPROVE_ORDER_VALIDATION_STATUS.FAILURE_LOCKED_BY_OTHER,
            isLocked,
            request,
            order,
          });
        case LOCK_ORDER_VALIDATION_RESULT.LOCKED_LOWER_LEVEL:
          isLocked = true;
          return resolve({
            status: APPROVE_ORDER_VALIDATION_STATUS.FAILURE_LOCKED_BY_OTHER,
            isLocked,
            request,
            order,
          });
        case LOCK_ORDER_VALIDATION_RESULT.UNLOCKED:
          isLocked = false;
          break;
      }

      // kiểm tra thông tin người duyệt
      if (request.finalApprover && request.finalReportID) {
        if (request.finalApprover.id === currentUser.id) {
          // Người duyệt chính là user hiện tại
          NotificationController.notifyModal({
            message:
              translate?.messages.notification.orderAlreadyApprovedTryAgain() ?? '',
            options: {
              variant: 'warning',
              onConfirm: () => {
                resolve({
                  status: APPROVE_ORDER_VALIDATION_STATUS.SUCCESS_APPROVED_SAME_USER,
                  isLocked,
                  request,
                  order,
                });
              },
              onCancel: () =>
                resolve({
                  status: APPROVE_ORDER_VALIDATION_STATUS.FAILURE_USER_CANCELLED,
                  isLocked,
                  request,
                  order,
                }),
            },
          });
          return;
        } else {
          // Người duyệt khác với user hiện tại
          const currentLevel = currentUser.level ?? 0;
          const approvedLevel = request.finalApprover?.level ?? 0;
          if (currentLevel > approvedLevel) {
            // User có level cao hơn người duyệt
            NotificationController.notifyModal({
              message: `${translate?.messages.notification.orderAlreadyApproved({
                name: request.finalApprover?.fullname || '',
              })} ${translate?.messages.notification.orderAlreadyApprovedTryAgain()}`,
              options: {
                variant: 'warning',
                onConfirm: () => {
                  resolve({
                    status: APPROVE_ORDER_VALIDATION_STATUS.SUCCESS,
                    isLocked,
                    request,
                    order,
                  });
                },
                onCancel: () =>
                  resolve({
                    status: APPROVE_ORDER_VALIDATION_STATUS.FAILURE_USER_CANCELLED,
                    isLocked,
                    request,
                    order,
                  }),
              },
            });
            return;
          } else {
            // User có level nhỏ hơn hoặc bằng người duyệt
            resolve({
              status: APPROVE_ORDER_VALIDATION_STATUS.FAILURE_APPROVED_BY_OTHER,
              isLocked,
              request,
              order,
            });
            return;
          }
        }
      } else {
        // ca chụp chưa có người duyệt
        resolve({
          status: APPROVE_ORDER_VALIDATION_STATUS.SUCCESS,
          isLocked,
          request,
          order,
        });
        return;
      }
    }

    return resolve({
      status: APPROVE_ORDER_VALIDATION_STATUS.FAILURE,
      isLocked,
      request,
      order,
    });
  });
};

export enum OrderApproveLabel {
  /**
   * Duyệt
   */
  APPROVE,
  /**
   * Duyệt lại
   */
  REAPPROVE,
}
/**
 * Kiểm tra ca này cần duyệt hay duyệt lại
 */
export const getOrderApproveLabel = (
  order: IOrderDTO,
  requestID: IOrderRequestDTO['id'],
): OrderApproveLabel => {
  const request = order?.requests?.find((request) => request.id === requestID);
  if (request) {
    return request.finalReportID
      ? OrderApproveLabel.REAPPROVE
      : OrderApproveLabel.APPROVE;
  }
  return OrderApproveLabel.APPROVE;
};
