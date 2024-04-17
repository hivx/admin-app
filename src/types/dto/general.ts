import { IGenericFilter, Nullable } from '@/types';

export type IBodyPartDTOBase = {
  id: string;
  name: string;
};

export type IBodyPartDTO = Nullable<IBodyPartDTOBase>;

export type ISearchBodyPartFilter = IGenericFilter;
