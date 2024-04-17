import { BaseEntity, IGenericFilter, Nullable } from '@/types';

import { IProcedureDTO } from './procedure';

export type IProcedureGroupDTOBase = {
  /**
   * Tên nhóm dịch vụ (*)
   */
  name: string;
  /**
   * Mô tả
   */
  description: string;
  /**
   * Dịch vụ chụp
   */
  procedures: IProcedureDTO[];
};

export type IProcedureGroupDTO = Nullable<IProcedureGroupDTOBase> & BaseEntity;

export type ISearchProcedureGroupFilter = IGenericFilter;

export type IProcedureGroupDTOCreate = Partial<
  Pick<IProcedureGroupDTO, 'description'> & { procedureIDs: BaseEntity['id'][] }
> &
  Pick<IProcedureGroupDTO, 'name'>;

export type IProcedureGroupDTOUpdate = BaseEntity & Partial<IProcedureGroupDTOCreate>;

export type IProcedureGroupDTODelete = BaseEntity;
