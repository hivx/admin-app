import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider } from '@/providers/Admin/AdminProvider';
import { useUserPermission } from '@/providers/AuthProvider';

import { ConnectedModalityTypeNameCreateModal } from '../../components/ModalityTypeName/ModalityTypeNameCreateModal';
import { ConnectedModalityTypeNameEditModal } from '../../components/ModalityTypeName/ModalityTypeNameEditModal';
import { ModalityTypeNameTable } from '../../components/ModalityTypeName/ModalityTypeNameTable';

export const AdminModalityTypeName = () => {
  const translate = useTranslate();

  const permission = useUserPermission();

  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.modalityTypeName.title()}
        ActionButtons={<></>}
        TableComponent={
          <ModalityTypeNameTable permission={permission} FilterComponent={undefined} />
        }
      />
      <ConnectedModalityTypeNameCreateModal />
      <ConnectedModalityTypeNameEditModal />
      <AdminRightClickMenu disabled={!permission?.isSysadmin} />
    </AdminProvider>
  );
};
