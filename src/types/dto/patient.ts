import { BaseEntity, Nullable } from '@/types';

import { ORDER_CREATION_TYPE } from './order';

export enum Gender {
  M = 'M',
  F = 'F',
  O = 'O',
}

export type IPatientDTOBase = {
  /**
   * Địa chỉ
   */
  address: string;
  /**
   * Ngày sinh
   */
  birthDate: string;
  /**
   * Cách tạo
   */
  creationType: `${ORDER_CREATION_TYPE}`;
  /**
   * Email
   */
  email: string;
  /**
   * Tên bệnh nhân
   */
  fullname: string;
  /**
   * Giới tính
   */
  gender: `${Gender}`;
  hospitalID: string;
  /**
   * Số điện thoại
   */
  phone: string;
  /**
   * Mã bệnh nhân
   */
  pid: string;
  /**
   * Mã Portal
   */
  portalCode: string;
};
export type IPatientDTO = Nullable<IPatientDTOBase> & BaseEntity;

export type IPatientDTOCreate = {
  address: string;
  birthDate: string;
  creationType: `${ORDER_CREATION_TYPE}`;
  email: string;
  fullname: string;
  gender: `${Gender}`;
  phone: string;
  pid: string;
};

export type IPatientDTOUpdate = BaseEntity & IPatientDTOCreate;

export type PatientRequestFilter = Partial<{
  requestedDateFrom: string;
  requestedDateTo: string;
  fromDate: string;
  toDate: string;
  procedureID: BaseEntity['id'];
  patientID: BaseEntity['id'];
  voided: boolean;
}>;
