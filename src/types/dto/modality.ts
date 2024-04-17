import { Nullable, BaseEntity, Voidable } from '@/types';

import { IModalityGroupDTO } from './modalityGroup';
import { IModalityRoomDTO } from './modalityRoom';
import { IProcedureDTO } from './procedure';

export type IModalityDTOBase = {
  hospitalID: string;
  uuid: string;
  /**
   * Tên máy
   */
  name: string;
  /**
   * Mã máy
   */
  code: string;
  /**
   * Nhóm máy
   */
  group: IModalityGroupDTO;
  /**
   * Phòng máy
   */
  room: IModalityRoomDTO;
  /**
   * Loại máy
   */
  modalityType: IModalityTypeNameDTO['name'];
  /**
   * Thông tin institution Name
   */
  institutionName: string;
  /**
   * Thông tin Model Name
   */
  manufacturerModelName: string;
  /**
   * Thông tin stationName
   */
  stationName: string;
  /**
   * AE Title
   */
  aeTitle: string;
  /**
   * Địa chỉ IP
   */
  ipAddress: string;
  /**
   * Định mức chụp
   */
  capability: number;
  /**
   * Hoạt động
   */
  enabled: boolean;
  /**
   * Cấu hình
   */
  config: string;
  /**
   * Dịch vụ thực hiện
   */
  procedures: IProcedureDTO[];
  /**
   * Số ca bảo hiểm
   */
  insurance: number;
};
export type IModalityDTO = Nullable<IModalityDTOBase> & BaseEntity & Voidable;

export type ISearchModalityFilter = Partial<{
  code: string;
  groupID: number;
  name: string;
  ids: number[];
  modalityTypes: string[];
  roomID: number;
  insuranceApplied: boolean;
}>;

export type IModalityDTOCreate = Partial<{
  code: string;
  name: string;
  groupID: number;
  roomID: number;
  modalityType: string;
  institutionName: string;
  manufacturerModelName: string;
  stationName: string;
  aeTitle: string;
  ipAddress: string;
  capability: number;
  enabled: boolean;
  config: string;
  procedureIDs: number[];
}>;

export type IModalityDTOUpdate = BaseEntity &
  Partial<{
    code: string;
    name: string;
    groupID: number;
    roomID: number;
    modalityType: string;
    institutionName: string;
    manufacturerModelName: string;
    stationName: string;
    aeTitle: string;
    ipAddress: string;
    capability: number;
    enabled: boolean;
    config: string;
    procedureIDs: number[];
  }>;

export type IModalityTypeNameDTOBase = {
  name?: string;
  description?: string;
};
export type IModalityTypeNameDTO = Nullable<IModalityTypeNameDTOBase> & { id: string };

export type IModalityTypeNameDTOCreate = IModalityTypeNameDTO;

export type IModalityTypeNameDTOUpdate = IModalityTypeNameDTOCreate;

export type IModalityTypeNameDTODelete = { id: string };

export type IModalityTypeNameFilterDTO = Nullable<IModalityTypeNameDTOBase>;
