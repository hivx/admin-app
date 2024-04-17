import { IRoleDTOBase, IUserDTO, USER_ROLE } from '@/types/dto';

export type IUserPermissions = Record<USER_PERMISSION, boolean> | undefined;

export const initialUserPermission: IUserPermissions = {
  userCanApproveOrder: false,
  userCanLockOrder: false,
  userCanMergeOrder: false,
  userCanEditOrder: false,
  userCanDeleteOrder: false,
  userCanModifyPatientOrder: false,
  userCanPrintDicom: false,
  userCanPrintPatientInfo: false,
  userCanBookmark: false,
  userCanCompareStudy: false,
  userCanViewStatistic: false,
  userCanSaveReport: false,
  isSysadmin: false,
  userCanUpdateTimeTable: false,
  userCanRecallApprovedReport: false,
};

enum USER_PERMISSION {
  userCanLockOrder = 'userCanLockOrder',
  userCanApproveOrder = 'userCanApproveOrder',
  userCanMergeOrder = 'userCanMergeOrder',
  userCanDeleteOrder = 'userCanDeleteOrder',
  userCanEditOrder = 'userCanEditOrder',
  userCanModifyPatientOrder = 'userCanModifyPatientOrder',
  userCanBookmark = 'userCanBookmark',
  userCanPrintDicom = 'userCanPrintDicom',
  userCanPrintPatientInfo = 'userCanPrintPatientInfo',
  userCanCompareStudy = 'userCanCompareStudy',
  userCanViewStatistic = 'userCanViewStatistic',
  userCanSaveReport = 'userCanSaveReport',
  userCanUpdateTimeTable = 'userCanUpdateTimeTable',
  userCanRecallApprovedReport = 'userCanRecallApprovedReport',
  isSysadmin = 'isSysadmin',
}

const getUserRoleFromGroup = (user: IUserDTO) => {
  const roles: IRoleDTOBase['id'][] = [];
  user.groups?.forEach((group) => {
    if (group.roles) {
      roles.push(...group.roles.map((role) => role.id));
    }
  });
  return roles;
};

export const getUserPermissisons = ({ user }: { user: IUserDTO | null }) => {
  const userRoles = user && getUserRoleFromGroup(user);

  if (!userRoles) {
    return initialUserPermission;
  }

  const isSysadmin = userRoles?.includes(USER_ROLE.SYSADMIN);
  const isAdmin = userRoles?.includes(USER_ROLE.ADMIN);
  const canSaveReport = userRoles.includes(USER_ROLE.REPORT_SAVE);
  const canApproveReport = userRoles.includes(USER_ROLE.REPORT_APPROVE);
  const canSaveBookmark = userRoles.includes(USER_ROLE.BOOKMARK_SAVE);
  const canDeleteBookmark = userRoles.includes(USER_ROLE.BOOKMARK_DELETE);
  const canModifyPatient = userRoles.includes(USER_ROLE.PATIENT_SAVE);

  const userCanMergeOrder =
    userRoles?.includes(USER_ROLE.ADMIN) ||
    isSysadmin ||
    userRoles?.includes(USER_ROLE.ORDER_MERGE) ||
    userRoles?.includes(USER_ROLE.ORDER_SAVE);

  const userCanDeleteOrder =
    userRoles?.includes(USER_ROLE.ORDER_DELETE) || isSysadmin || isAdmin;
  const userCanEditOrder =
    userRoles?.includes(USER_ROLE.ORDER_SAVE) || isSysadmin || isAdmin;

  const userCanViewStatistic =
    userRoles?.includes(USER_ROLE.ADMIN) ||
    isSysadmin ||
    userRoles?.includes(USER_ROLE.VIEW_STATISTIC);

  const userCanModifyPatientOrder = isSysadmin || isAdmin || canModifyPatient;

  /**
   * Điều kiện user có thể Khóa ca
   */
  const userCanLockOrder = isSysadmin || canSaveReport || canApproveReport || isAdmin;
  /**
   * Điều kiện user có thể Lưu nháp báo cáo
   */
  const userCanSaveReport = isSysadmin || canSaveReport || canApproveReport || isAdmin;

  const userCanApproveOrder = isSysadmin || canApproveReport || isAdmin;

  const userCanBookmark = isSysadmin || isAdmin || canSaveBookmark || canDeleteBookmark;

  const userCanUpdateTimeTable =
    userRoles?.includes(USER_ROLE.TIMETABLE_SAVE) || isSysadmin || isAdmin;

  const userCanRecallApprovedReport =
    userRoles?.includes(USER_ROLE.RECALL_APPROVED_REPORT) || isSysadmin || isAdmin;

  const userPermissions: IUserPermissions = {
    userCanApproveOrder,
    userCanLockOrder,
    userCanMergeOrder,
    userCanDeleteOrder,
    userCanEditOrder,
    userCanPrintDicom: false,
    userCanPrintPatientInfo: false,
    userCanBookmark,
    userCanViewStatistic,
    userCanCompareStudy: false,
    userCanSaveReport,
    isSysadmin,
    userCanModifyPatientOrder,
    userCanUpdateTimeTable,
    userCanRecallApprovedReport,
  };

  return userPermissions;
};
