import { IUserDTO, USER_MODULE, USER_TYPE } from '@/types/dto';

/**
 * Mỗi user type,có modules ưu tiên làm màn hình mặc định khi đăng nhập.
 * @return list modules có module ưu tiên được đặt lên đầu
 */
export const getModulesPriorityByUserType = (
  modules: string[],
  userType?: IUserDTO['type'],
) => {
  let defaultModules: string | null;

  switch (userType) {
    case USER_TYPE.IMAGING_DOCTOR:
      defaultModules = USER_MODULE.REPORTING;
      break;
    case USER_TYPE.REFER_DOCTOR:
      defaultModules = USER_MODULE.PUBLICATION;
      break;
    case USER_TYPE.TECHNICIAN:
      defaultModules = USER_MODULE.SUMMARY;
      break;
    case USER_TYPE.COUNTER:
      defaultModules = USER_MODULE.SUMMARY;
      break;
    case USER_TYPE.ADMIN:
      defaultModules = USER_MODULE.SUMMARY;
      break;
    case USER_TYPE.SYSADMIN:
      defaultModules = USER_MODULE.SUMMARY;
      break;
    default:
      defaultModules = USER_MODULE.SUMMARY;
  }

  if (!modules.includes(defaultModules)) {
    defaultModules = null;
  }
  const listModulesWithPriorityFirst = [
    defaultModules,
    ...modules.filter((module) => module !== defaultModules),
  ];

  return listModulesWithPriorityFirst;
};
