import { useGetListModalityQuery } from '../api/modality';
import { useGetListModuleQuery } from '../api/module';
import { useGetListRoleQuery } from '../api/role';
import { useGetListStatisticsReportQuery } from '../api/statisticalReport';

export const useUserGroupForm = () => {
  const { data: modalityData } = useGetListModalityQuery({
    filter: {},
  });

  const { data: roleData } = useGetListRoleQuery({
    filter: {},
  });

  const { data: moduleData } = useGetListModuleQuery({
    filter: {},
  });

  const { data: statisticalReportData } = useGetListStatisticsReportQuery({
    filter: {},
  });

  const listModality = modalityData?.list;
  const listRole = roleData?.list;
  const listModule = moduleData?.list;
  const listReport = statisticalReportData?.list;

  return {
    listModality,
    listRole,
    listModule,
    listReport,
  };
};
