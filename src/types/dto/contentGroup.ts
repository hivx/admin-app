import { BaseEntity, Nullable } from '@/types';

export type IContentGroupDTOBase = {
  hospitalID: string;
  /**
   * Tên nhóm
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
  uuid: string;
};

export type IContentGroupDTO = Nullable<IContentGroupDTOBase> & BaseEntity;

export type ISearchContentGroupFilter = Partial<{
  ids: number[];
  modalityTypes: string[];
}>;

export type IContentGroupDTOCreate = Partial<
  Pick<IContentGroupDTOBase, 'description' | 'modalityType' | 'name'>
>;

export type IContentGroupDTOUpdate = BaseEntity & Partial<IContentGroupDTOCreate>;

export type IContentGroupDTODelete = BaseEntity;
