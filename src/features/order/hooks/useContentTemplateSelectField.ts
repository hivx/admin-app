import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { BUTTON_STATE } from '@/types';

import {
  selectRadiologyReportIsEditable,
  setRadiologyReportButtonState,
} from '../../../stores/OrderRadiology';
import { useCurrentOrderID } from '../providers';

export const useContentTemplateSelectField = () => {
  const orderID = useCurrentOrderID();
  const isEditing = useAppSelector(selectRadiologyReportIsEditable(orderID));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setRadiologyReportButtonState({
        orderID,
        button: 'CONTENT_TEMPLATE_SELECT',
        state: isEditing ? BUTTON_STATE.ACTIVE : BUTTON_STATE.DISABLED,
      }),
    );
  }, [dispatch, isEditing, orderID]);
  return;
};
