import { BaseEntity, Nullable } from '..';

export enum AttributeDataType {
  BOOLEAN = 'BOOLEAN',
  STRING = 'STRING',
}

export type IConfigAttributeDTOBase = {
  datatype: string;
  datatypeConfig: string;
  description: string;
  maxOccurs: number;
  minOccurs: number;
  name: string;
};

export type IConfigAttributeDTO = Nullable<IConfigAttributeDTOBase> & { id: string };
