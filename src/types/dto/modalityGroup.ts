import { BaseEntity, Nullable } from '@/types';

export type IModalityGroupDTOBase = {
  code: string;
  name: string;
  description: string;
  hospitalID: string;
  index: number;
  uuid: string;
};

export type IModalityGroupDTO = Nullable<IModalityGroupDTOBase> & BaseEntity;

export type ISearchModalityGroupFilter = Record<never, never>;

export type IModalityGroupDTOCreate = Partial<
  Pick<IModalityGroupDTOBase, 'code' | 'description' | 'index' | 'name'>
>;

export type IModalityGroupDTOUpdate = BaseEntity & Partial<IModalityGroupDTOCreate>;

export type IModalityGroupDTODelete = BaseEntity;
