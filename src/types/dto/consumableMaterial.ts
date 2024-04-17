import { BaseEntity, Nullable } from '..';

export type IConsumableMaterialDTOBase = {
  code: string;
  description: string;
  hospitalID: string;
  name: string;
  type: IConsumableTypeDTO;
  unit: string;
  uuid: string;
};

export type IConsumableMaterialDTO = Nullable<IConsumableMaterialDTOBase> & BaseEntity;

export type IConsumableTypeDTO = {
  description: string;
  id: string;
  name: string;
};
