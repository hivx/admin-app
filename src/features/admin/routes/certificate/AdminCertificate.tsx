import { MyButton } from '@/components';
import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { useTranslate } from '@/hooks';
import { AdminProvider, useAdminFunctions } from '@/providers/Admin/AdminProvider';

import { ConnectedCertificateCreateModal } from '../../components/Certificate/CertificateCreateModal';
import { CertificateListFilterForm } from '../../components/Certificate/CertificateListFilterForm';
import { CertificateTable } from '../../components/Certificate/CertificateTable';

export const AdminCertificate = () => {
  const translate = useTranslate();

  const adminFunctions = useAdminFunctions();
  return (
    <AdminProvider>
      <AdminShell
        title={translate.resources.certificate.title()}
        TableComponent={
          <CertificateTable FilterComponent={<CertificateListFilterForm />} />
        }
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
      <ConnectedCertificateCreateModal />
      <AdminRightClickMenu />
    </AdminProvider>
  );
};
