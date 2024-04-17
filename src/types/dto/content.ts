import { BaseEntity, Nullable } from '@/types';

import { IContentGroupDTO } from './contentGroup';
import { IProcedureDTO } from './procedure';

export type IContentBase = {
  /**
   * Nội dung
   */
  findings: string;
  /**
   * Kết luận
   */
  impression: string;
  /**
   * Mô tả
   */
  description: string;
  /**
   * Nhóm mẫu
   */
  groups: IContentGroupDTO[];
  /**
   * Tên mẫu
   */
  name: string;
  /**
   * Dịch vụ chụp
   */
  procedures: IProcedureDTO[];
  user: {
    id: number;
    hospitalID: string;
    uuid: string;
    code: string;
    title: string;
    username: string;
    fullname: string;
    roles: string[];
  };
};

export type IContentDTO = Nullable<IContentBase> & BaseEntity;

export type ISearchContentFilter = Partial<Pick<IContentBase, 'name'>> &
  Partial<{
    groupID: number;
    ids: number[];
    modalityTypes: string[];
    name: string;
    procedureID: number;
    userID: number;
  }>;

export type IContentDTOCreate = Pick<IContentDTO, 'name'> &
  Partial<
    Pick<IContentDTO, 'description' | 'findings' | 'impression'> & {
      procedureIDs: BaseEntity['id'][];
      groupIDs: BaseEntity['id'][];
    }
  >;

export type IContentDTOUpdate = BaseEntity & IContentDTOCreate;

export type IContentDTODelete = BaseEntity;
