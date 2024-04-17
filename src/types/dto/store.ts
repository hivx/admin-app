import { Nullable } from 'vitest';

import { BaseEntity } from '..';

export type IStoreDTOBase = {
  aeTitle: string;
  config: string;
  hospitalID: string;
  ipAddress: string;
  name: string;
  port: number;
  preferred: boolean;
  stowrs: string;
  type: string;
  wadors: string;
};

export type IStoreDTO = BaseEntity & Nullable<IStoreDTOBase>;

export type IStoreDTOSearch = Partial<{
  ids: BaseEntity['id'][];
  preferred: true;
  type: string;
}>;
