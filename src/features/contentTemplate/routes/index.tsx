import { RouteObject, useRoutes } from 'react-router-dom';

import { ContentTemplateMain } from '../component/ContentTemplateMain';

import { TemplatePaths } from './paths';

export const TemplateRoutes = () => {
  const statisticPage = useRoutes(templateRoutes);
  return <>{statisticPage}</>;
};

const templateRoutes: RouteObject[] = [
  {
    path: TemplatePaths.Base,
    element: <ContentTemplateMain />,
  },
];

export * from './paths';
