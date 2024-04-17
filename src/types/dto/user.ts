import { BaseEntity, Nullable } from '@/types';

import { ICertificateDTO } from './certificate';
import { IDepartmentDTO } from './department';
import { IGroupDTO } from './group';
import { IModalityDTO } from './modality';
import { IRoleDTO } from './role';

// Defines DataObjects Schema (DTO) from back-end

export enum USER_MODULE {
  /**
   * Phòng chụp
   */
  EXAMINATION = 'EXAMINATION',
  /**
   * Đọc ca
   */
  REPORTING = 'REPORTING',
  /**
   * Trả kết quả
   */
  PUBLICATION = 'PUBLICATION',
  /**
   * Hội chẩn từ xa
   */
  TELEMEDICINE = 'TELEMEDICINE',
  /**
   * Báo cáo thống kê
   */
  STATISTICS = 'STATISTICS',
  /**
   * Quản trị hệ thống
   */
  ADMINISTRATION = 'ADMINISTRATION',
  /**
   * Tiếp đón
   */
  REGISTRATION = 'REGISTRATION',
  /**
   * Tổng hợp
   */
  SUMMARY = 'SUMMARY',
  /**
   * Lịch làm việc
   */
  TIMETABLE = 'TIMETABLE',
  /**
   * Mẫu kết quả
   */
  TEMPLATE = 'TEMPLATE',
  /**
   * Đọc ca chậm
   */
  REPORTING_READING = 'REPORTING_READING',
}

export enum USER_TYPE {
  SYSADMIN = 'SYSADMIN',
  ADMIN = 'ADMIN',
  COUNTER = 'COUNTER',
  NURSING = 'NURSING',
  TECHNICIAN = 'TECHNICIAN',
  REFER_DOCTOR = 'REFER_DOCTOR',
  IMAGING_DOCTOR = 'IMAGING_DOCTOR',
}

export enum USER_ROLE {
  SYSADMIN = 'sysadmin',
  ADMIN = 'admin',
  ORDER_SAVE = 'order_save',
  ORDER_DELETE = 'order_delete',
  ORDER_ATTACHMENT = 'order_attach',
  CONTENT_GET = 'content_get',
  CONTENT_SAVE = 'content_save',
  CONTENT_DELETE = 'content_delete',
  REPORT_SAVE = 'report_save',
  REPORT_APPROVE = 'report_approve',
  REPORT_DELETE = 'report_delete',
  PATIENT_SAVE = 'patient_save',
  PATIENT_DELETE = 'patient_delete',
  ORDER_MERGE = 'order_merge',
  VIEW_STATISTIC = 'analytics_get',
  BOOKMARK_SAVE = 'bookmark_save',
  BOOKMARK_DELETE = 'bookmark_delete',
  TIMETABLE_SAVE = 'timetable_save',
  RECALL_APPROVED_REPORT = 'recall_approved_report',
}

export interface IJwtToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  expiresIn: number;
  issuedAt: number;
  type: string;
}

export type IUserDTOBase = {
  /**
   * Avatar
   */
  avatar: string;
  /**
   * Chữ ký số
   */
  certificateID: BaseEntity['id'];
  /**
   * Mã người dùng
   */
  code: string;
  /**
   * Khoa phòng
   */
  department: IDepartmentDTO;

  /**
   * Email
   */
  email: string;
  enabled: boolean;
  /**
   * Tên người dùng
   */
  fullname: string;
  /**
   * Nhóm người dùng
   */
  groups: IGroupDTO[];
  hospitalID: string;
  /**
   * Cấp
   */
  level: number;
  /**
   * Số điện thoạt
   */
  phone: string;
  /**
   * Mật khẩu
   */
  password: string;
  /**
   * Phân quyền
   */
  roles: IRoleDTO[];
  /**
   * Chũ ký (ảnh)
   */
  signature: string; // base64 string
  /**
   * Tiêu đề
   */
  title: string;
  /**
   * Loại tài khoản
   */
  type: `${USER_TYPE}`;
  /**
   * Tên tài khoản
   */
  username: string;

  departmentID: BaseEntity['id'];
  modalities: IModalityDTO[];
  certificate: ICertificateDTO;
  uuid: string;
};

export type IUserDTO = Nullable<IUserDTOBase> & BaseEntity;

export type IUserTypeDTO = BaseEntity &
  Nullable<{
    name: string;
  }>;

export type IUserTypeDTOFilter = Partial<Pick<IUserTypeDTO, 'id'>>;

export type ICloudUserDTO = Nullable<{
  code: string;
  fullname: string;
  hospitalID: string;
  level: number;
  roles: IRoleDTO[];
  title: string;
  type: `${USER_TYPE}`;
  username: string;
  uuid: string;
}> &
  BaseEntity;

export type ISearchUserFilter = Partial<
  Pick<IUserDTO, 'code' | 'departmentID' | 'fullname'> & {
    groupIDs: IGroupDTO['id'][];
    types: IUserDTO['type'][];
    ids: BaseEntity['id'][];
    onDuty: boolean;
  }
>;

export type IUserCreateDTO = Pick<
  IUserDTO,
  'code' | 'fullname' | 'username' | 'password'
> &
  Partial<Omit<IUserDTO, 'code' | 'fullname' | 'username' | 'password'>> &
  Partial<{
    /**
     * list ID máy chụp
     */
    modalityIDs: IModalityDTO['id'][];
    /**
     * list ID phân quyền
     */
    roleIDs: IRoleDTO['id'][];
    /**
     * list ID nhóm người dùng
     */
    groupIDs: IGroupDTO['id'][];
  }>;

export type IUserUpdateDTO = BaseEntity & IUserCreateDTO;
