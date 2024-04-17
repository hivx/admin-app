import { styled } from '@mui/material';
import * as React from 'react';

import { SidebarLayout } from '@/components/Elements/Navigation/SidebarLayout';
import PacsHead from '@/components/Head/PacsHead';
import { ContentLayout } from '@/components/Layout/ContentLayout';
import { useTranslate } from '@/hooks';

import AdminSidebar from './AdminSidebar';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

const StyledLayout = styled(ContentLayout)`
  display: grid;
  grid-template-columns: auto minmax(50vw, 1fr);
  grid-template-rows: minmax(50vh, 1fr);
  width: 100%;
  height: 100%;
`;

export const AdminLayout = ({ children, title }: LayoutProps) => {
  const translate = useTranslate();
  return (
    <StyledLayout Head={<PacsHead customTitle={title} />}>
      <SidebarLayout title={translate.pages.admin.title()} collapsible>
        <AdminSidebar />
      </SidebarLayout>
      <StyleContentContainer>{children}</StyleContentContainer>
    </StyledLayout>
  );
};

const StyleContentContainer = styled('div')`
  width: 100%;
  height: 100%;
`;
