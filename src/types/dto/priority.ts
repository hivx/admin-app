import { BaseEntity, Nullable } from '@/types';

export type IPriorityDTOBase = {
  hospitalID: string;
  name: string;
  preferred: boolean;
  uuid: string;
};

export type IProrityDTO = Nullable<IPriorityDTOBase> & BaseEntity;
