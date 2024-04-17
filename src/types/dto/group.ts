import { BaseEntity, Nullable } from '@/types';

import { IModalityDTO } from './modality';
import { IModuleDTO } from './module';
import { IRoleDTO } from './role';
import { IStatisticalReportDTO } from './statisticalReport';

export type IGroupDTOBase = {
  hospitalID: string;
  /**
   * Tên nhóm người dùng
   */
  name: string;
  /**
   * Tên nhóm người dùng
   */
  description: string;
  /**
   * Phân quyền
   */
  roles: IRoleDTO[];
  /**
   * Máy chụp
   */
  modalities: IModalityDTO[];
  /**
   * Module
   */
  modules: IModuleDTO[];
  /**
   * Báo cáo
   */
  reports: IStatisticalReportDTO[];
};

export type IGroupDTO = Nullable<IGroupDTOBase> & BaseEntity;

export type IGroupDTOCreate = Pick<IGroupDTOBase, 'name'> &
  Pick<IGroupDTO, 'description'> &
  Partial<{
    reportIDs: BaseEntity[];
    roleIDs: BaseEntity[];
    moduleIDs: BaseEntity[];
    modalityIDs: BaseEntity[];
  }>;

export type IGroupDTOUpdate = BaseEntity & IGroupDTOCreate;

export type ISearchGroupFilter = Partial<Pick<IGroupDTO, 'name'>>;
