import { BaseEntity } from '..';

import { IConsumableDTO } from './consumable';
export type IProcedureConsumableDTOBase = {
  materialID: number;
  quantity: number;
};

export type IProcedureConsumableGetDTO = Partial<IProcedureConsumableDTOBase> &
  Partial<{
    hospitalID: string;
    material: IConsumableDTO;
    procedureID: number;
    uuid: number;
  }> &
  BaseEntity;

export type IProcedureConsumableUpdateDTO = Partial<IProcedureConsumableDTOBase> &
  BaseEntity;
