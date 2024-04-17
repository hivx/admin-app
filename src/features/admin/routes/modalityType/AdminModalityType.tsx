import React from 'react';

import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useAppSelector, useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IModalityTypeDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { ConnectedModalityTypeCreateModal } from '../../components/ModalityType/ModalityTypeCreateModal';
import { ConnectedModalityTypeEditModal } from '../../components/ModalityType/ModalityTypeEditModal';
import { ModalityTypeTable } from '../../components/ModalityType/ModalityTypeTable';

export const AdminModalityType = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();
  const record = useAppSelector(
    getCurrentSelectedRow<IModalityTypeDTO>(RESOURCES.MODALITY_TYPE),
  );
  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.modalityType.title()}
        TableComponent={<ModalityTypeTable />}
        ActionButtons={
          <>
            <MyButton
              variant="contained"
              onClick={() => adminFunctions.openCreateModal()}
            >
              {translate.buttons.create()}
            </MyButton>
          </>
        }
      />
      <ConnectedModalityTypeEditModal />
      <ConnectedModalityTypeCreateModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
