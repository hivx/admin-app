import { BaseEntity, Nullable } from '@/types';

export type IDepartmentDTOBase = {
  hospitalID: string;
  /**
   * Mã khoa
   */
  code: string;
  /**
   * Tên khoa
   */
  name: string;
  /**
   * Mô tả
   */
  description: string;
  /**
   * Trạng thái
   */
  enabled: boolean;
  /**
   * Mã trực thuộc
   */
  parentID: BaseEntity['id'];
  uuid: string;
  /**
   * Trực thuộc
   */
  parent: IDepartmentDTO;
};

export type IDepartmentDTO = Nullable<IDepartmentDTOBase> & BaseEntity;

export type ISearchDepartmentFilter = Partial<{
  code: string;
  parentID: BaseEntity['id'] | string;
  name: string;
  // description: string;
}>;

export type IDepartmentDTOCreate = Partial<
  Pick<IDepartmentDTOBase, 'description' | 'parentID'>
> &
  Pick<IDepartmentDTOBase, 'name' | 'code'>;

export type IDepartmentDTOUpdate = BaseEntity &
  Pick<
    Partial<IDepartmentDTOBase>,
    'code' | 'description' | 'name' | 'enabled' | 'parentID'
  >;
