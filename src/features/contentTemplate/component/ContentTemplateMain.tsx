import { styled } from '@mui/material';

import { NavBarLayout } from '@/components/Layout/NavBarLayout';
import { useTranslate } from '@/hooks';

import { TemplateLayout } from '../component/Layout/TemplateLayout';

import { ContentTemplateList } from './ContentTemplateList';
import { ContentTemplateSidebar } from './ContentTemplateSidebar';

export const ContentTemplateMain = () => {
  const translate = useTranslate();
  return (
    <TemplateLayout title={translate.pages.template.title()}>
      <NavBarLayout>
        <StyledLayout>
          <ContentTemplateSidebar />
          <ContentTemplateList />
        </StyledLayout>
      </NavBarLayout>
    </TemplateLayout>
  );
};

const StyledLayout = styled('div')`
  display: grid;
  grid-template-columns: auto minmax(50vw, 1fr);
  grid-template-rows: minmax(50vh, 1fr);
  width: 100%;
  height: 100%;
`;
