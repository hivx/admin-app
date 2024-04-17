import { styled } from '@mui/material';

import { AdminRightClickMenu } from '@/components/Admin/AdminRightClickMenu';
import { AdminShell } from '@/components/Admin/AdminShell';
import { ConnectedContentCreateModal } from '@/components/Admin/Content/ContentCreateModal';
import { ConnectedContentEditModal } from '@/components/Admin/Content/ContentEditModal';
import { useTranslate } from '@/hooks';
import { AdminProvider } from '@/providers/Admin/AdminProvider';
import { TABLE_CONTENT_BY_USER } from '@/stores/table/tableInitialState';

import { ContentTemplateTable } from './ContentTemplateTable';

export const ContentTemplateList = () => {
  const translate = useTranslate();

  return (
    <StyleContentContainer>
      <AdminProvider>
        <AdminShell
          title={translate.pages.template.sidebarTitle()}
          TableComponent={<ContentTemplateTable />}
          ActionButtons={<></>}
        />
        <ConnectedContentCreateModal />
        <ConnectedContentEditModal tableID={TABLE_CONTENT_BY_USER} />
        <AdminRightClickMenu />
        <AdminRightClickMenu />
      </AdminProvider>
    </StyleContentContainer>
  );
};
const StyleContentContainer = styled('div')`
  width: 100%;
  height: 100%;
`;
