import { BaseEntity, Nullable } from '..';

import { IConsumableMaterialDTO } from './consumableMaterial';

export type IConsumableDTOBase = {
  error: boolean;
  hospitalID: string;
  material: IConsumableMaterialDTO;
  materialID: number;
  quantity: number;
  requestID: number;
  uuid: string;
};

export type IConsumableDTO = Nullable<IConsumableDTOBase> & BaseEntity;
export type IConsumableDTOSearch = Partial<{ requestID: number; id: number }>;

export type IConsumableCreateDTO = (Pick<IConsumableDTOBase, 'requestID' | 'materialID'> &
  Pick<IConsumableDTO, 'error' | 'quantity'>)[];

export type IConsumableUpdateDTO = Pick<IConsumableDTO, 'id'> &
  Pick<IConsumableDTO, 'error' | 'quantity' | 'materialID'>;

export type IConsumableRadiology = Pick<
  IConsumableDTO,
  'error' | 'quantity' | 'materialID'
>;
