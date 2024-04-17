import { Nullable } from '@/types';

export type IRoleDTOBase = {
  name: string;
  id: string;
};

export type IRoleDTO = Nullable<{
  description: string;
}> &
  IRoleDTOBase;

export type ISearchRoleFilter = Partial<Pick<IRoleDTO, 'name'>>;

export type IRoleDTOCreate = IRoleDTO;

export type IRoleDTOUpdate = IRoleDTOCreate;

export type IRoleDTODelete = { id: string };

export type IRoleNameDTO = {
  id: string;
  name: string;
};
