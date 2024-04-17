import { Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { NavBarLayout } from '@/components/Layout/NavBarLayout';
import { useTranslate } from '@/hooks';
import { lazyImport } from '@/utils/lazyImport';

import { AdminLayout } from '../components';

import { AdminPaths } from './paths';

export const AdminRoutes = () => {
  const adminPages = useRoutes(adminRoutes); // similar to <Outlet />
  const translate = useTranslate();
  return (
    <NavBarLayout>
      <Suspense fallback={<FullPageSpinner />}>
        <AdminLayout title={translate.pages.admin.title()}>
          <>{adminPages}</>
        </AdminLayout>
      </Suspense>
    </NavBarLayout>
  );
};

const { AdminMain } = lazyImport(() => import('./AdminMain'), 'AdminMain');
const { AdminDepartment } = lazyImport(
  () => import('./department/AdminDepartment'),
  'AdminDepartment',
);
const { AdminCertificate } = lazyImport(
  () => import('./certificate/AdminCertificate'),
  'AdminCertificate',
);

const { AdminModalityRoom } = lazyImport(
  () => import('./modalityRoom/AdminModalityRoom'),
  'AdminModalityRoom',
);

const { AdminModality } = lazyImport(
  () => import('./modality/AdminModality'),
  'AdminModality',
);

const { AdminModalityType } = lazyImport(
  () => import('./modalityType/AdminModalityType'),
  'AdminModalityType',
);
const { AdminProcedure } = lazyImport(
  () => import('./procedure/AdminProcedure'),
  'AdminProcedure',
);
const { AdminModalityGroup } = lazyImport(
  () => import('./modalityGroup/AdminModalityGroup'),
  'AdminModalityGroup',
);
const { AdminProcedureGroup } = lazyImport(
  () => import('./procedureGroup/AdminProcedureGroup'),
  'AdminProcedureGroup',
);
const { AdminContentGroup } = lazyImport(
  () => import('./contentGroup/AdminContentGroup'),
  'AdminContentGroup',
);
const { AdminContent } = lazyImport(
  () => import('./content/AdminContent'),
  'AdminContent',
);
const { AdminLayoutTemplate } = lazyImport(
  () => import('./layout/AdminLayoutTemplate'),
  'AdminLayoutTemplate',
);

const { AdminUserGroup } = lazyImport(
  () => import('./userGroup/AdminUserGroup'),
  'AdminUserGroup',
);

const { AdminUser } = lazyImport(() => import('./user/AdminUser'), 'AdminUser');

const { AdminConfig } = lazyImport(() => import('./config/AdminConfig'), 'AdminConfig');
const { AdminApplication } = lazyImport(
  () => import('./application/AdminApplication'),
  'AdminApplication',
);
const { AdminDisplayConfig } = lazyImport(
  () => import('./displayConfig/AdminDisplayConfig'),
  'AdminDisplayConfig',
);
const { AdminEventLog } = lazyImport(
  () => import('./eventLog/AdminEventLog'),
  'AdminEventLog',
);
const { AdminFileStore } = lazyImport(
  () => import('./fileStore/AdminFileStore'),
  'AdminFileStore',
);
const { AdminModalityTypeName } = lazyImport(
  () => import('./modalityTypeName/AdminModalityTypeName'),
  'AdminModalityTypeName',
);
const { AdminOrder } = lazyImport(() => import('./order/AdminOrder'), 'AdminOrder');
const { AdminPatient } = lazyImport(
  () => import('./patient/AdminPatient'),
  'AdminPatient',
);
const { AdminRemoteStore } = lazyImport(
  () => import('./remoteStore/AdminRemoteStore'),
  'AdminRemoteStore',
);
const { AdminShiftWork } = lazyImport(
  () => import('./shiftWork/AdminShiftWork'),
  'AdminShiftWork',
);
const { AdminStatisticsReport } = lazyImport(
  () => import('./statisticsReport/AdminStatisticsReport'),
  'AdminStatisticsReport',
);
const { AdminStore } = lazyImport(() => import('./store/AdminStore'), 'AdminStore');
const { AdminStudy } = lazyImport(() => import('./study/AdminStudy'), 'AdminStudy');
const { AdminUserActivity } = lazyImport(
  () => import('./userActivity/AdminUserActivity'),
  'AdminUserActivity',
);
const { AdminUserType } = lazyImport(
  () => import('./userType/AdminUserType'),
  'AdminUserType',
);
const { AdminWorkStation } = lazyImport(
  () => import('./workstation/AdminWorkStation'),
  'AdminWorkStation',
);
const { AdminRole } = lazyImport(() => import('./role/AdminRole'), 'AdminRole');

const adminRoutes: RouteObject[] = [
  {
    path: AdminPaths.Base,
    element: <AdminMain />,
  },
  {
    path: AdminPaths.Department,
    element: <AdminDepartment />,
  },
  {
    path: AdminPaths.Modality_Room,
    element: <AdminModalityRoom />,
  },
  {
    path: AdminPaths.Modality_Group,
    element: <AdminModalityGroup />,
  },
  {
    path: AdminPaths.Certificate,
    element: <AdminCertificate />,
  },
  {
    path: AdminPaths.Modality,
    element: <AdminModality />,
  },
  {
    path: AdminPaths.Modality_Type,
    element: <AdminModalityType />,
  },
  {
    path: AdminPaths.Procedure,
    element: <AdminProcedure />,
  },
  {
    path: AdminPaths.Procedure_Group,
    element: <AdminProcedureGroup />,
  },
  {
    path: AdminPaths.Content_Group,
    element: <AdminContentGroup />,
  },
  {
    path: AdminPaths.Content,
    element: <AdminContent />,
  },
  {
    path: AdminPaths.Layout,
    element: <AdminLayoutTemplate />,
  },
  {
    path: AdminPaths.User_Group,
    element: <AdminUserGroup />,
  },
  {
    path: AdminPaths.User,
    element: <AdminUser />,
  },
  {
    path: AdminPaths.Application,
    element: <AdminApplication />,
  },
  {
    path: AdminPaths.Config,
    element: <AdminConfig />,
  },
  {
    path: AdminPaths.DisplayConfig,
    element: <AdminDisplayConfig />,
  },
  {
    path: AdminPaths.Workstation,
    element: <AdminWorkStation />,
  },
  {
    path: AdminPaths.FileStore,
    element: <AdminFileStore />,
  },
  {
    path: AdminPaths.ModalityTypeName,
    element: <AdminModalityTypeName />,
  },
  {
    path: AdminPaths.EventLog,
    element: <AdminEventLog />,
  },
  {
    path: AdminPaths.Order,
    element: <AdminOrder />,
  },
  {
    path: AdminPaths.Patient,
    element: <AdminPatient />,
  },
  {
    path: AdminPaths.RemoteStore,
    element: <AdminRemoteStore />,
  },
  {
    path: AdminPaths.ShiftWork,
    element: <AdminShiftWork />,
  },
  {
    path: AdminPaths.StatisticsReport,
    element: <AdminStatisticsReport />,
  },
  {
    path: AdminPaths.Store,
    element: <AdminStore />,
  },
  {
    path: AdminPaths.Study,
    element: <AdminStudy />,
  },
  {
    path: AdminPaths.UserActivity,
    element: <AdminUserActivity />,
  },
  {
    path: AdminPaths.UserType,
    element: <AdminUserType />,
  },
  {
    path: AdminPaths.Role,
    element: <AdminRole />,
  },
];

export * from './paths';
