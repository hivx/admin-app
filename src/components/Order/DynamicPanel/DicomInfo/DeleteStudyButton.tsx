import React from 'react';

import { useDeleteStudyMutation } from '@/api/study';
import { ItechDeleteIcon } from '@/assets/icon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { useTranslate } from '@/hooks';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import { IOrderDTO } from '@/types/dto';

/**
 * Action button Delete study in DicomInfoDynamicPanel
 */
export const DeleteStudyButton = ({ order }: { order?: IOrderDTO }) => {
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const [deleteStudy] = useDeleteStudyMutation();
  const hasStudy = !!order?.study?.id && !!order?.id;

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.study.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.study.title().toLowerCase(),
    }),
  );

  const handleClick = () => {
    notifyModal({
      message: translate.messages.notification.deleteStudy({
        patientName: order?.patient?.fullname ?? '',
        studyIUID: order?.study?.studyInstanceUID ?? '',
      }),
      options: {
        variant: 'warning',
        onConfirm: () => {
          if (order && order.study) {
            const res = deleteStudy({ orderID: order.id, studyID: order.study.id });
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

  return (
    <DynamicPanelHeaderButton
      disabled={!hasStudy}
      IconComponent={ItechDeleteIcon}
      title={translate.resources.study.deleteStudyInfo()}
      onClick={handleClick}
    />
  );
};
