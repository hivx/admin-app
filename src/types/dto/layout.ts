import { BaseEntity, Nullable } from '..';

import { IDepartmentDTO } from './department';
import { IProcedureDTO } from './procedure';

export type ILayoutDTOBase = {
  /**
   * Tên mẫu
   */
  name: string;
  /**
   * Mô tả
   */
  description: string;
  /**
   * Loại máy
   */
  modalityType: string;
  /**
   * Định dạng
   */
  format: string;
  /**
   * data
   */
  data: string;
  /**
   * Dịch vụ chụp
   */
  procedures: IProcedureDTO[];
  /**
   * Số lượng ảnh yêu cầu
   */
  numOfImages: number;
  /**
   * Khoa phòng
   */
  departments: IDepartmentDTO[];
  keyImageNames: string[];
};

export type ILayoutDTO = Nullable<ILayoutDTOBase> & BaseEntity;

export type ISearchLayoutFilter = Partial<
  Pick<ILayoutDTO, 'name' | 'modalityType'> & {
    procedureID: BaseEntity['id'];
    departmentID: BaseEntity['id'];
  }
>;

export type ILayoutDTOCreate = Pick<ILayoutDTOBase, 'name' | 'data'> &
  Partial<
    Pick<
      ILayoutDTOBase,
      'description' | 'format' | 'modalityType' | 'numOfImages' | 'keyImageNames'
    > & {
      procedureIDs: BaseEntity['id'][];
      departmentIDs: BaseEntity['id'][];
    }
  >;

export type ILayoutDTOUpdate = BaseEntity & ILayoutDTOCreate;
