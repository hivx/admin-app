import { Paper } from '@mui/material';
import React from 'react';

import { ItechUnlockIcon, LockIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { ContextPopupController } from '@/components/Menu/ContextPopupController';
import { useAppSelector } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { getSelectedModality } from '@/stores/qms/selectModalitySlice';

import { useUpdateQmsModalityMutation } from '../../api/qmsModality';

export const ModalityRightClick = () => {
  const { close } = useContextMenu();
  const { selectModality } = useAppSelector(getSelectedModality);
  const [updateModality] = useUpdateQmsModalityMutation();

  const labelText = selectModality.enabled ? 'Khóa phòng' : 'Mở phòng';

  const notifySuccess = useGenericNotifySnackbar('success', labelText);

  const notifyError = useGenericNotifySnackbar('error', labelText);

  const updateModalityStatus = async () => {
    if (selectModality.id) {
      try {
        const res = await updateModality({
          id: selectModality.id,
          enabled: !selectModality.enabled,
        });
        if ('error' in res) {
          notifyError();
        } else {
          close();
          notifySuccess();
        }
      } catch (e) {
        notifyError();
      }
    }
  };

  return (
    <ContextPopupController type="menu">
      {selectModality && (
        <ContextMenuItemShell
          IconComponent={
            selectModality.enabled ? (
              <LockIcon fontSize="small" color="primary" />
            ) : (
              <ItechUnlockIcon fontSize="small" color="primary" />
            )
          }
          MenuItemProps={{
            onClick: () => updateModalityStatus(),
          }}
          MainComponent={labelText}
        />
      )}
    </ContextPopupController>
  );
};
