import { UserInfomationType } from '@/lib/dataHelper/getUserModules';
import { USER_MODULE } from '@/types/dto';

export const getModuleIdByModuleName = (
  moduleName: USER_MODULE,
  moduleInfomation?: UserInfomationType[],
) => {
  return moduleInfomation?.find(
    (moduleInfomation) => moduleInfomation.name === moduleName,
  )?.id;
};
