import { BaseEntity, Nullable } from '..';

export type IUserGroupDTOBase = {
  /**
   * Tên nhóm người dùng
   */
  name: string;
  /**
   * Mô tả
   */
  description: string;
  /**
   * Các máy chụp
   */
  modalityIDs: number[];
  /**
   * Các module
   */
  moduleIDs: string[];
  /**
   * Các báo cáo thống kê
   */
  reportIDs: number[];
  /**
   * Các quyền
   */
  roleIDs: string[];
};

export type IUserGroupDTO = Nullable<IUserGroupDTOBase> & BaseEntity;

export type ISearchUserGroupFilter = Partial<Pick<IUserGroupDTO, 'name'>>;

export type IUserGroupDTOCreate = Pick<IUserGroupDTOBase, 'name'> &
  Partial<Omit<IUserGroupDTOBase, 'name'>>;

export type IUserGroupDTOUpdate = BaseEntity & IUserGroupDTOCreate;
