import { Typography } from '@mui/material';
import React, { FC, useCallback } from 'react';

import { useUpdateOrderStudyMutation } from '@/api/orderStudy';
import { useAppSelector, useTranslate } from '@/hooks';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { useRegisterOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { TABLE_ORDER_MERGE_STUDY } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO, IStudyDTO } from '@/types/dto';

import InfoOrderFields from './InfoOrderFields';
import InfoShell from './InfoShell';

{
  /**
   * THÔNG TIN CHỈ ĐỊNH + THÔNG TIN ẢNH DICOM
   */
}

const InfoOrder: FC = () => {
  const rowSelected = useAppSelector(
    getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER_MERGE_STUDY),
  );
  const register = useRegisterOrderListFunctions();
  const [updateOrderStudy] = useUpdateOrderStudyMutation();
  const notify = useNotifySnackbar();
  const translate = useTranslate();

  /**
   * Call Api orderStudy to merge study
   */
  const handleUpdateOrderStudy = useCallback(
    (studyID: IStudyDTO['id']) => {
      if (rowSelected?.id) {
        try {
          updateOrderStudy({ orderID: rowSelected?.id, studyID });
          notify({
            message: translate.messages.result.genericSuccess({
              subject: translate.messages.titles.mergeStudy(),
            }),
            options: {
              variant: 'success',
            },
          });
        } catch (e) {
          notify({
            message: translate.messages.result.genericUnsuccess({
              subject: translate.messages.titles.mergeStudy(),
            }),
            options: {
              variant: 'error',
            },
          });
        }
      }
    },
    [
      notify,
      rowSelected?.id,
      translate.messages.result,
      translate.messages.titles,
      updateOrderStudy,
    ],
  );
  register('updateOrderStudy', handleUpdateOrderStudy);

  return (
    <InfoShell
      Title={
        <Typography>
          {translate.resources.order.mergeOrder.infoOrder().toUpperCase()}
        </Typography>
      }
      Content={<InfoOrderFields order={rowSelected} />}
    />
  );
};

export default InfoOrder;
