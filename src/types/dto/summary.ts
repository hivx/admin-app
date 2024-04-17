import { BaseEntity, Nullable } from '..';

export type ISummaryDTOBase = {
  code: string;
  configJSON: Record<string, string>;
  name: string;
};
export type ISummaryDTO = Nullable<ISummaryDTOBase> & BaseEntity;
