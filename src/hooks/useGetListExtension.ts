import { useGetListModuleExtensionQuery } from '@/api/extension';
import { getModuleIdByModuleName } from '@/dataHelper/getModuleIdByModuleName';
import { getUserModules } from '@/lib/dataHelper/getUserModules';
import { selectCurrentUser } from '@/stores/auth';
import { IExtensionDTO, USER_MODULE } from '@/types/dto';

import { useAppSelector } from '.';

// get list extensions based on module
export const useGetListExtension = (module: USER_MODULE): IExtensionDTO[] => {
  const currentUser = useAppSelector(selectCurrentUser);
  const userModulesData = getUserModules({ user: currentUser });
  const moduleInfomation = userModulesData?.userModulesInfomation;

  const currentPanelModuleIds = getModuleIdByModuleName(module, moduleInfomation);

  const { data } = useGetListModuleExtensionQuery(
    { moduleIDs: [currentPanelModuleIds ?? 0], module },
    {
      refetchOnMountOrArgChange: 86400,
      skip: !currentPanelModuleIds,
    },
  );
  const extensions = data ? [...data[module]] : [];
  return extensions;
};
