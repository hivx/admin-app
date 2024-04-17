import { BaseEntity, Nullable, Voidable } from '@/types';
import { IConsumableUpdateDTO, IDepartmentDTO, IModalityTypeDTO } from '@/types/dto';

import { IOrderRequestDTO } from './orderRequest';
import { IPatientDTO } from './patient';
import { IProrityDTO } from './priority';
import { ORDER_DIAGNOSIS_STEP_STATUS } from './radiologyReport';
import { IStudyDTO } from './study';
import { ICloudUserDTO } from './user';

export enum ORDER_CREATION_TYPE {
  HIS = 'HIS',
  RIS = 'RIS',
  TAG = 'TAG',
}

export type IOrderDTOBase = {
  /**
   * Mã chỉ định
   */
  accessionNumber: string;
  /**
   * Thuộc tính khác
   */
  attributes: Record<string, string>;
  /**
   * Cách tạo
   */
  creationType: `${ORDER_CREATION_TYPE}`;
  /**
   * Mô tả
   */
  description: string;
  /**
   * Chẩn đoán lâm sàng
   */
  diagnosis: string;
  /**
   * Số hồ sơ bệnh án
   */
  encounterNumber: string;
  hospitalID: string;
  inpatient: boolean;
  /**
   * Ghi chú
   */
  instructions: string;
  /**
   * Đối tượng BHYT
   */
  insuranceApplied: boolean;
  /**
   * Ngày hết hạn
   */
  insuranceExpiredDate: string;
  /**
   * Ngày có hiệu lực
   */
  insuranceIssuedDate: string;
  /**
   * Số BHYT
   */
  insuranceNumber: string;
  /**
   * Bác sĩ khoá ca
   */
  lockedBy: ICloudUserDTO;
  /**
   * Loại máy chụp
   */
  modalityType: string;
  /**
   * Thông tin bệnh nhân
   */
  patient: IPatientDTO;
  /**
   * Loại ưu tiên
   */
  priority: IProrityDTO;
  /**
   * Bác sĩ chỉ định
   */
  referringPhysician: ICloudUserDTO;
  /**
   * Trạng thái đọc
   */
  reportStatus: `${ORDER_DIAGNOSIS_STEP_STATUS}`;
  /**
   * Khoa chỉ định
   */
  requestedDepartment: IDepartmentDTO;
  /**
   * Thời gian chỉ định
   */
  requestedTime: string;
  /**
   * Yêu cầu chụp
   */
  requests: IOrderRequestDTO[];
  /**
   * Ảnh chụp
   */
  study: IStudyDTO;
  /**
   * Cấp cứu
   */
  urgent: boolean;
  /**
   * Mã kết nối
   */
  orderNumber: string;
  uuid: string;
};

export type IOrderDTO = Nullable<IOrderDTOBase> & Voidable & BaseEntity;

export type ISearchOrderFilter = Partial<
  {
    accessionNumber: string;
    approvedDateFrom: string;
    approvedDateTo: string;
    approverID: BaseEntity['id'];
    id: string;
    inpatient: boolean;
    ids: BaseEntity['id'][];
    modalityIDs: BaseEntity['id'][];
    patientName: string;
    pid: string;
    patientID: BaseEntity['id'];
    pidSuffix: string;
    reportStatus: `${ORDER_DIAGNOSIS_STEP_STATUS}`[];
    requestedDateFrom: string;
    requestedDateTo: string;
    requestedDepartmentID: BaseEntity['id'];
    modalityType: IModalityTypeDTO['name'];
    referringPhysicianID: BaseEntity['id'];
  } & Voidable
>;

export type IOrderCreateDTO = Partial<{
  accessionNumber: string;
  attributes: Record<string, string>;
  description: string;
  diagnosis: string;
  encounterNumber: string;
  instructions: string;
  insuranceApplied: boolean;
  insuranceExpiredDate: string;
  insuranceIssuedDate: string;
  insuranceNumber: string;
  modalityType: string;
  patientID: BaseEntity['id'];
  priorityID: BaseEntity['id'];
  referringPhysicianID: BaseEntity['id'];
  reportStatus: `${ORDER_DIAGNOSIS_STEP_STATUS}`;
  requestedDepartmentID: BaseEntity['id'];
  requestedTime: string;
  orderNumber: string;
  urgent: boolean;
  requests: IOrderRequestDTOCreate[];
  creationType: `${ORDER_CREATION_TYPE}`;
  inpatient: boolean;
}>;

export type IOrderUpdateDTO = BaseEntity & IOrderCreateDTO;

export type IOrderRequestDTOCreate = {
  /**
   * Mã ICD
   */
  icdCode: string;
  modalityID: BaseEntity['id'];
  procedureID: BaseEntity['id'];
  requestedNumber: string;
  operationTime: string;
  operatorIDs: BaseEntity['id'][];
  finalApprovedTime: string;
  requestedTime: string;
  expectedReporterID: number;
  finalApproverID: number;
  consumables?: IConsumableUpdateDTO[];
};

/**
 * Khoá ca chụp
 */
export type IOrderLockDTOBase = {
  expiredTime: string;
  hospitalID: string;
  user: ICloudUserDTO;
  uuid: string;
};

export type IOrderLockDTO = Nullable<IOrderLockDTOBase> & BaseEntity;

export type IOrderLockDTOCreate = {
  id: BaseEntity['id'];
  minuteToExpire?: number;
};

export type ISearchOrderHistoryFilter = Pick<
  ISearchOrderFilter,
  | 'ids'
  | 'modalityType'
  | 'patientID'
  | 'requestedDateFrom'
  | 'requestedDateTo'
  | 'voided'
>;
