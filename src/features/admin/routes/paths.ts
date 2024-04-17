/**
 * Define route paths here to avoid circular dependency
 */
export enum AdminPaths {
  Base = '/',
  Department = '/department',
  Certificate = '/certificate',
  Modality = '/modality',
  Modality_Room = '/modality-room',
  Modality_Type = '/modality-type',
  Modality_Group = '/modality-group',
  Procedure_Group = '/procedure-group',
  Procedure = '/procedure',
  Content_Group = '/content-group',
  Content = '/content',
  Layout = '/layout',
  User_Group = '/user-group',
  User = '/user',
  Role = '/role',
  UserType = '/user-type',
  ModalityTypeName = '/modality-type-name',
  ShiftWork = '/shift-work',
  StatisticsReport = '/statistics-report',
  Patient = '/patient',
  Study = '/study',
  Order = '/order',
  Store = '/store',
  RemoteStore = '/remote-store',
  FileStore = '/file-store',
  UserActivity = '/user-activity',
  EventLog = '/event-log',
  Config = '/config',
  DisplayConfig = '/display-config',
  Application = '/application',
  Workstation = '/workstation',
}

export const ROUTE_ADMIN = '/admin';
/**
 * Khoa phòng
 */
export const ROUTE_ADMIN_DEPARTMENT = `${ROUTE_ADMIN}${AdminPaths.Department}`;
/**
 * Chữ ký số
 */
export const ROUTE_ADMIN_CERTIFICATE = `${ROUTE_ADMIN}${AdminPaths.Certificate}`;
/**
 * Phòng chụp
 */
export const ROUTE_ADMIN_MODALITYROOM = `${ROUTE_ADMIN}${AdminPaths.Modality_Room}`;
/**
 * Máy chụp
 */
export const ROUTE_ADMIN_MODALITY = `${ROUTE_ADMIN}${AdminPaths.Modality}`;
/**
 * Loại máy chụp
 */
export const ROUTE_ADMIN_MODALITYTYPE = `${ROUTE_ADMIN}${AdminPaths.Modality_Type}`;
/**
 * Nhóm máy chụp
 */
export const ROUTE_ADMIN_MODALITYGROUP = `${ROUTE_ADMIN}${AdminPaths.Modality_Group}`;
/**
 * Nhóm dịch vụ chụp
 */
export const ROUTE_ADMIN_PROCEDURE_GROUP = `${ROUTE_ADMIN}${AdminPaths.Procedure_Group}`;
/**
 * Dịch vụ chụp
 */
export const ROUTE_ADMIN_PROCEDURE = `${ROUTE_ADMIN}${AdminPaths.Procedure}`;
/**
 * Nhóm mẫu chẩn đoán
 */
export const ROUTE_ADMIN_CONTENT_GROUP = `${ROUTE_ADMIN}${AdminPaths.Content_Group}`;
/**
 * Mẫu chẩn đoán
 */
export const ROUTE_ADMIN_CONTENT = `${ROUTE_ADMIN}${AdminPaths.Content}`;
/**
 * Mẫu in
 */
export const ROUTE_ADMIN_LAYOUT = `${ROUTE_ADMIN}${AdminPaths.Layout}`;
/**
 * Nhóm người dùng
 */
export const ROUTE_ADMIN_USER_GROUP = `${ROUTE_ADMIN}${AdminPaths.User_Group}`;
/**
 * Người dùng
 */
export const ROUTE_ADMIN_USER = `${ROUTE_ADMIN}${AdminPaths.User}`;
/**
 * Phân quyền người dùng
 */
export const ROUTE_ADMIN_USER_ROLE = `${ROUTE_ADMIN}${AdminPaths.Role}`;
/**
 * Đối tượng người dùng
 */
export const ROUTE_ADMIN_USER_TYPE = `${ROUTE_ADMIN}${AdminPaths.UserType}`;
/**
 * Ký hiệu loại máy
 */
export const ROUTE_ADMIN_MODALITY_TYPE_NAME = `${ROUTE_ADMIN}${AdminPaths.ModalityTypeName}`;
/**
 * Ca làm việc
 */
export const ROUTE_ADMIN_SHIFT_WORK = `${ROUTE_ADMIN}${AdminPaths.ShiftWork}`;
/**
 * Báo cáo thống kê
 */
export const ROUTE_ADMIN_STATISTICS_REPORT = `${ROUTE_ADMIN}${AdminPaths.StatisticsReport}`;
/**
 * Bệnh nhân chụp
 */
export const ROUTE_ADMIN_PATIENT = `${ROUTE_ADMIN}${AdminPaths.Patient}`;
/**
 * Ảnh chụp DICOM
 */
export const ROUTE_ADMIN_STUDY = `${ROUTE_ADMIN}${AdminPaths.Study}`;
/**
 * Chỉ định chụp
 */
export const ROUTE_ADMIN_ORDER = `${ROUTE_ADMIN}${AdminPaths.Order}`;
/**
 * Kho lưu trữ DICOM
 */
export const ROUTE_ADMIN_STORE = `${ROUTE_ADMIN}${AdminPaths.Store}`;
/**
 * Kho chuyển ca
 */
export const ROUTE_ADMIN_REMOTE_STORE = `${ROUTE_ADMIN}${AdminPaths.RemoteStore}`;
/**
 * Kho lưu trữ dữ liệu
 */
export const ROUTE_ADMIN_FILE_STORE = `${ROUTE_ADMIN}${AdminPaths.FileStore}`;
/**
 * Hoạt động người dùng
 */
export const ROUTE_ADMIN_USER_ACTIVITY = `${ROUTE_ADMIN}${AdminPaths.UserActivity}`;
/**
 * Hoạt động kết nối
 */
export const ROUTE_ADMIN_EVENT_LOG = `${ROUTE_ADMIN}${AdminPaths.EventLog}`;
/**
 * Cấu hình hệ thống
 */
export const ROUTE_ADMIN_CONFIG = `${ROUTE_ADMIN}${AdminPaths.Config}`;
/**
 * Cấu hình hiển thị
 */
export const ROUTE_ADMIN_DISPLAY_CONFIG = `${ROUTE_ADMIN}${AdminPaths.DisplayConfig}`;
/**
 * Kết nối phần mềm
 */
export const ROUTE_ADMIN_APPLICATION = `${ROUTE_ADMIN}${AdminPaths.Application}`;
/**
 * Máy trạm đọc ảnh
 */
export const ROUTE_ADMIN_WORKSTATION = `${ROUTE_ADMIN}${AdminPaths.Workstation}`;
