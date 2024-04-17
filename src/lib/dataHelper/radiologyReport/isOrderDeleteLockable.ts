import { IOrderDTO, IUserDTO } from '@/types/dto';

import { getOrderLockStatus, LOCK_ORDER_VALIDATION_RESULT } from './validateLockOrder';

type Options = {
  order?: IOrderDTO | null;
  currentUser?: IUserDTO | null;
};

/**
 * check current user can delete lock one order
 * https://docs.google.com/spreadsheets/d/1vjVNLf4Pby7jfZp6xxsHRKh7KmTfBsp7OoSYtGYCgyU/edit#gid=0
 * @returns boolean
 */
const isOrderDeleteLockable = (options: Options): boolean => {
  // check an order is delete lockable or not
  const { order, currentUser } = options;

  if (!order || !currentUser) return false;
  const lockStatus = getOrderLockStatus(order, currentUser);

  switch (lockStatus) {
    case LOCK_ORDER_VALIDATION_RESULT.UNLOCKED:
      return false;
    case LOCK_ORDER_VALIDATION_RESULT.LOCKED_HIGHER_LEVEL:
      return true;
    case LOCK_ORDER_VALIDATION_RESULT.LOCKED_LOWER_LEVEL:
      return false;
    case LOCK_ORDER_VALIDATION_RESULT.LOCKED_SAME_USER:
      return true;
    case LOCK_ORDER_VALIDATION_RESULT.APPROVED_HIGHER_LEVEL:
      return false;
  }
};

export default isOrderDeleteLockable;
