import { BaseEntity, Nullable, Voidable } from '@/types';

import { IProcedureConsumableGetDTO } from './procedureConsumable';

export type IProcedureDTOBase = {
  /**
   * Mã dịch vụ (*)
   */
  code: string;
  /**
   * Tên dịch vụ (*)
   */
  name: string;
  /**
   * Mô tả DICOM
   */
  dicomDescription: string;
  /**
   * Loại máy chụp (*)
   */
  modalityType: string;
  /**
   * Bộ phận chụp
   */
  bodyParts: string[];
  /**
   * Hỗ trợ AI
   */
  supportAI: boolean;
  /**
   * Vật tư tiêu hao
   */
  consumables: IProcedureConsumableGetDTO[];
};

export type IProcedureDTO = Nullable<IProcedureDTOBase> & BaseEntity & Voidable;

export type ISearchProcedureFilter = Partial<{
  bodyPart: string;
  code: string;
  modalityTypes: string[];
  name: string;
  ids: number[];
}>;

export type IProcedureDTOCreate = Partial<IProcedureDTOBase>;

export type IProcedureDTOUpdate = BaseEntity & Partial<IProcedureDTOBase>;
