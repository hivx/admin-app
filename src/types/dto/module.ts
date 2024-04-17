import { BaseEntity, Nullable } from '@/types';

export type IModuleDTOBase = {
  name: string;
  description: string;
  config: null;
  hospitalID: string;
  index: number;
  uuid: string;
};

export type IModuleDTO = Nullable<IModuleDTOBase> & BaseEntity;

export type ISearchModuleFilter = Partial<Pick<IModuleDTO, 'name'>>;
