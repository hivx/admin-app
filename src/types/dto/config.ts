import { BaseEntity, Nullable } from '..';

import { IConfigAttributeDTO } from './configAttribute';

export type IConfigDTOBase = {
  attribute: IConfigAttributeDTO;
  attributeValue: string;
  hospitalID: string;
  preferred: boolean;
  uuid: string;
};

export type IConfigDTO = Nullable<IConfigDTOBase> & BaseEntity;

export type IConfigCreateDTO = Pick<IConfigDTOBase, 'attributeValue'> & {
  attributeID: string;
  preferred: boolean;
};

export type IConfigUpdateDTO = BaseEntity & Partial<IConfigCreateDTO>;

export type IConfigForm = BaseEntity & Partial<IConfigCreateDTO>;
