import { BaseEntity, Nullable } from '..';

export type IApplicationTypeDTO = {
  id: string;
  name: string;
};
export type IApplicationDTOBase = {
  config: string;
  description: string;
  hospitalID: string;
  name: string;
  enabled: boolean;
  secret: string;
  type: IApplicationTypeDTO['id'];
  url: string;
  uuid: string;
};

export type IApplicationDTO = BaseEntity & Nullable<IApplicationDTOBase>;

export type IApplicationCreateDTO = Pick<IApplicationDTOBase, 'type' | 'name' | 'url'> &
  Nullable<Pick<IApplicationDTOBase, 'enabled' | 'secret' | 'config'>>;

export type IApplicationUpdateDTO = BaseEntity &
  Pick<IApplicationDTOBase, 'type' | 'name' | 'url'> &
  Nullable<Pick<IApplicationDTOBase, 'enabled' | 'secret' | 'config'>>;
