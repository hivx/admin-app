import { useAppDispatch, useAppSelector } from '@/hooks';
import { BaseEntity } from '@/types';

import {
  selectCurrentRequestID,
  setContentTemplateID,
} from '../../../stores/OrderRadiology';
import { useCurrentOrderID } from '../providers';

export const useSelectTemplate = () => {
  const dispatch = useAppDispatch();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));

  const triggerSetTemplate = async ({
    contentID,
    callbackSuccess,
  }: {
    contentID: BaseEntity['id'];
    callbackSuccess?: () => void;
  }) => {
    if (!contentID) {
      return;
    }
    dispatch(
      setContentTemplateID({
        orderID,
        requestID,
        contentID,
        triggerSetContentData: true,
        callbackSuccess,
      }),
    );
  };

  return {
    triggerSetTemplate,
  };
};
